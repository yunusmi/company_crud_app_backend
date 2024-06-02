import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { Op } from 'sequelize';
import { createRedisConnection, dataLiveTime } from '../config/redis';
import { returnException } from '../utils/exception';
import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetInventoriesResponse,
  UpdateInventoryResponse,
  RedisMethodsInterface,
} from '../utils/interfaces';

export class InventoryService {
  async createInventoryItem(
    productId: number,
    quantityInStock: number
  ): Promise<number> {
    const transaction = await db.sequelize.transaction();
    const { inventory_id: insertId } = await db.inventories.create(
      {
        product_id: productId,
        quantity_in_stock: quantityInStock,
      },
      { transaction }
    );

    if (!insertId) {
      await transaction.rollback();
      await returnException('Ошибка создания инвентаря', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis);

    await redis.set(
      `inventory:${insertId}`,
      JSON.stringify({
        inventory_id: insertId,
        product_id: productId,
        quantity_in_stock: quantityInStock,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return insertId;
  }

  async getAllInventoryItems(): Promise<GetInventoriesResponse[]> {
    const redis = await createRedisConnection();
    const inventoriesCached = await redis.get(`inventories`);
    if (!inventoriesCached || inventoriesCached === null) {
      const inventoryItems = await db.inventories.findAll();
      if (!inventoryItems) {
        await returnException('Ошибка получения данных', 500, redis);
      }

      await redis.set('inventories', JSON.stringify(inventoryItems), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return inventoryItems;
    }

    await redis.quit();
    return JSON.parse(inventoriesCached);
  }

  async getInventoryItemById(
    inventoryId: number
  ): Promise<GetInventoriesResponse | null> {
    const redis = await createRedisConnection();
    const inventoryCached = await redis.get(`inventory:${inventoryId}`);
    if (!inventoryCached || inventoryCached === null) {
      const inventoryItem = await db.inventories.findOne({
        where: {
          inventory_id: inventoryId,
          quantity_in_stock: { [Op.gt]: 0 },
        },
      });

      if (!inventoryItem) {
        await returnException(
          `Запись с таким ID ${inventoryId} не найдена`,
          404,
          redis
        );
      }

      await redis.set(
        `inventory:${inventoryId}`,
        JSON.stringify(inventoryItem),
        {
          EX: dataLiveTime,
          NX: true,
        }
      );

      await redis.quit();
      return inventoryItem;
    }

    await redis.quit();
    return JSON.parse(inventoryCached);
  }

  async updateInventoryItemById(
    productId: number,
    quantityInStock: number
  ): Promise<UpdateInventoryResponse> {
    const transaction = await db.sequelize.transaction();
    const inventoryData = await db.inventories.findOne({
      where: {
        product_id: productId,
      },
      transaction,
    });

    if (!inventoryData) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найдена`
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedRows = await inventoryData.update(
      { quantity_in_stock: quantityInStock },
      { transaction }
    );

    if (!updatedRows) {
      await transaction.rollback();
      await returnException('Ошибка обновления записи инвентаря', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();

    const inventoryId = inventoryData.dataValues.inventory_id;
    await this.deleteCachedData(redis, inventoryId);

    await redis.set(`inventory:${inventoryId}`, JSON.stringify(updatedRows), {
      EX: dataLiveTime,
      NX: true,
    });

    await redis.quit();
    return updatedRows;
  }

  async deleteInventoryItemById(inventoryId: number): Promise<void> {
    const transaction = await db.sequelize.transaction();
    const inventory = await db.inventories.findByPk(inventoryId, {
      transaction,
    });

    if (!inventory) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Запись с таким ID ${inventoryId} не найдена`
      );
      error.statusCode = 404;
      throw error;
    }

    const deletedRows = await inventory.destroy({ transaction });
    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, inventoryId);
    await redis.quit();

    return deletedRows;
  }

  // Уменьшает кол-во остатка на складе после продажи товара
  async decreaseQtyAfterSale(
    productId: number,
    excistingSaledProductQtyOnDB: number,
    productSaledQtyNow: number
  ): Promise<number> {
    const productSales = await db.inventories.findOne({
      where: {
        product_id: productId,
      },
    });

    if (!productSales) {
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const inventoryId: number = productSales.dataValues.inventory_id;

    const preTotalSaledQty: number =
      productSales.dataValues.quantity_in_stock + excistingSaledProductQtyOnDB;

    const totalSaledQty: number = preTotalSaledQty - productSaledQtyNow;

    const updatedRows = await productSales.update(
      {
        quantity_in_stock: totalSaledQty,
      },
      {
        where: {
          product_id: productId,
          inventory_id: inventoryId,
        },
      }
    );

    if (!updatedRows) {
      await returnException('Ошибка обновления записи продаж и остатков', 500);
    }

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, inventoryId);

    await this.deleteProductCachedData(redis, productId);

    await redis.set(
      `inventory:${inventoryId}`,
      JSON.stringify({
        inventory_id: inventoryId,
        product_id: productId,
        quantity_in_stock: totalSaledQty,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return inventoryId;
  }

  async deleteCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    inventoryId?: number
  ): Promise<void> {
    const cachedInventoriesDataExcists = await redis.get('inventories');

    if (cachedInventoriesDataExcists || cachedInventoriesDataExcists !== null) {
      const deleteCachedData = await redis.del('inventories');

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
      }
    }

    if (inventoryId) {
      const cachedOneInventoryDataExcists = await redis.get(
        `inventory:${inventoryId}`
      );

      if (
        cachedOneInventoryDataExcists ||
        cachedOneInventoryDataExcists !== null
      ) {
        const deleteCachedData = await redis.del(`inventory:${inventoryId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    return;
  }

  async deleteProductCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    productId?: number
  ): Promise<void> {
    const cachedOneProductDataExcists = await redis.get(`product:${productId}`);

    if (cachedOneProductDataExcists || cachedOneProductDataExcists !== null) {
      const deleteCachedData = await redis.del(`product:${productId}`);

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
      }
    }

    return;
  }
}
