import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { createRedisConnection, dataLiveTime } from '../config/redis';
import { returnException } from '../utils/exception';
import { InventoryService } from './inventory.service';
import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetProductsResponse,
  DeleteProductsResponse,
  UpdateProductResponse,
  RedisMethodsInterface,
} from '../utils/interfaces';

export class ProductService {
  private inventoryService: InventoryService;

  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;
  }

  async createProduct(
    productName: string,
    price: number,
    quantityInStock: number,
    branchId: number
  ): Promise<number> {
    const insertProduct = await db.products.create({
      product_name: productName,
      price: price,
      branch_id: branchId,
    });

    const productId = insertProduct.dataValues.product_id;

    if (!productId) {
      await insertProduct.destroy();
      await returnException('Ошибка при создании товара', 500);
    }

    const inventoryId = await this.inventoryService.createInventoryItem(
      productId,
      quantityInStock
    );

    if (!inventoryId) {
      await insertProduct.destroy();
      await returnException('Ошибка при создании записи в инвентаре', 500);
    }

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis);

    await redis.set(
      `product:${productId}`,
      JSON.stringify({
        product_id: productId,
        product_name: productName,
        price: price,
        branch_id: branchId,
        quantity_in_stock: quantityInStock,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return productId;
  }

  async getAllProducts(): Promise<GetProductsResponse[]> {
    const redis = await createRedisConnection();
    const productsCached = await redis.get('products');
    if (!productsCached || productsCached === null) {
      const products = await db.products.findAll({
        order: [['branch_id', 'DESC']],
      });

      if (!products) {
        await returnException('Ошибка получения товаров', 500, redis);
      }

      await redis.set('products', JSON.stringify(products), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return products;
    }

    await redis.quit();
    return JSON.parse(productsCached);
  }

  async getProductById(productId: number): Promise<GetProductsResponse | null> {
    const redis = await createRedisConnection();
    const productCached = await redis.get(`product:${productId}`);
    if (!productCached || productCached === null) {
      const product = await db.products.findByPk(productId, {});
      if (!product) {
        await returnException(
          `Товар с таким ID ${productId} не найден`,
          404,
          redis
        );
      }

      const productQty = await this.getProductQtyByProductId(productId);

      const productData = {
        ...product?.dataValues,
        quantity_in_stock: productQty,
      };

      await redis.set(`product:${productId}`, JSON.stringify(productData), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return productData;
    }

    await redis.quit();
    return JSON.parse(productCached);
  }

  async getProductQtyByProductId(productId: number): Promise<number> {
    const productQty = await db.inventories.findOne({
      where: {
        product_id: productId,
      },
    });

    if (!productQty) {
      const error: ResponseError = new Error(
        `Запись инвентаря с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return productQty.dataValues.quantity_in_stock;
  }

  async getProductsByBranchId(
    branchId: number
  ): Promise<GetProductsResponse[]> {
    const redis = await createRedisConnection();
    const productsCached = await redis.get(`branch_products:${branchId}`);
    if (!productsCached || productsCached === null) {
      const products = await db.products.findAll({
        where: {
          branch_id: branchId,
        },
      });

      if (!products) {
        await returnException(
          `Товары с таким branch_id ${branchId} не найдены`,
          404,
          redis
        );
      }

      await redis.set(`branch_products:${branchId}`, JSON.stringify(products), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return products;
    }

    await redis.quit();
    return JSON.parse(productsCached);
  }

  async updateProductById(
    productId: number,
    productName: string,
    price: number,
    quantityInStock: number,
    branchId: number
  ): Promise<UpdateProductResponse> {
    const transaction = await db.sequelize.transaction();
    const product = await db.products.findByPk(productId, { transaction });
    if (!product) {
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const inventoryData = await this.inventoryService.updateInventoryItemById(
      productId,
      quantityInStock
    );

    if (!inventoryData) {
      await transaction.rollback();
      await returnException('Ошибка обновления записи инвентаря', 500);
    }

    const updatedRows = await product.update({
      product_name: productName,
      price: price,
      branch_id: branchId,
    });

    if (!updatedRows) {
      await transaction.rollback();
      await returnException('Ошибка обновления товара', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, productId);

    await redis.set(
      `product:${productId}`,
      JSON.stringify({
        product_id: productId,
        product_name: productName,
        price: price,
        branch_id: branchId,
        quantity_in_stock: quantityInStock,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return updatedRows;
  }

  async deleteProductById(productId: number): Promise<DeleteProductsResponse> {
    const transaction = await db.sequelize.transaction();
    const product = await db.products.findByPk(productId, { transaction });
    if (!product) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const [deleted_product_rows, deleted_inventory_rows] = await Promise.all([
      product.destroy({ transaction }),
      db.inventories.destroy({
        where: {
          product_id: productId,
        },
        transaction,
      }),
    ]);

    if (!deleted_inventory_rows) {
      await transaction.rollback();
      await returnException('Ошибка удаления товара', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, productId, product.dataValues.branch_id);
    await redis.quit();

    return {
      deleted_product_rows,
      deleted_inventory_rows,
    };
  }

  async deleteCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    productId?: number,
    branchId?: number
  ): Promise<void> {
    const cachedProductsDataExcists = await redis.get('products');

    if (cachedProductsDataExcists || cachedProductsDataExcists !== null) {
      const deleteCachedData = await redis.del('products');

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
      }
    }

    if (productId) {
      const cachedOneProductDataExcists = await redis.get(
        `product:${productId}`
      );

      if (cachedOneProductDataExcists || cachedOneProductDataExcists !== null) {
        const deleteCachedData = await redis.del(`product:${productId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    if (branchId) {
      const cachedBranchProductsDataExcists = await redis.get(
        `branch_products:${branchId}`
      );

      if (
        cachedBranchProductsDataExcists ||
        cachedBranchProductsDataExcists !== null
      ) {
        const deleteCachedData = await redis.del(`branch_products:${branchId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    return;
  }
}
