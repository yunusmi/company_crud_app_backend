import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetProductsResponse,
  DeleteProductsResponse,
  UpdateProductResponse,
} from '../utils/interfaces';

export class ProductService {
  async createProduct(
    defaultProductQuantity: number,
    productName: string,
    price: number,
    branchId: number
  ): Promise<number> {
    const { product_id: productId } = await db.products.create({
      product_name: productName,
      price: price,
      branch_id: branchId,
    });

    if (!productId) {
      const error: ResponseError = new Error('Ошибка при создании товара');
      error.statusCode = 500;
      throw error;
    }

    const { inventory_id: inventoryId } = await db.inventories.create({
      product_id: productId,
      quantity_in_stock: defaultProductQuantity,
    });

    if (!inventoryId) {
      const error: ResponseError = new Error(
        'Ошибка при создании записи в инвентаре'
      );
      error.statusCode = 500;
      throw error;
    }

    return productId;
  }

  async getAllProducts(): Promise<GetProductsResponse[]> {
    const products = await db.products.findAll();

    if (!products) {
      const error: ResponseError = new Error('Ошибка получения товаров');
      error.statusCode = 500;
      throw error;
    }

    return products;
  }

  async getProductById(productId: number): Promise<GetProductsResponse> {
    const product = await db.products.findByPk(productId, {});
    if (!product) {
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return product;
  }

  async getProductsByBranchId(
    branchId: number
  ): Promise<GetProductsResponse[]> {
    const products = await db.products.findAll({
      where: {
        branch_id: branchId,
      },
    });

    if (!products) {
      const error: ResponseError = new Error(
        `Товары с таким branch_id ${branchId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return products;
  }

  async updateProductById(
    productId: number,
    productName: string,
    price: number,
    branchId: number
  ): Promise<UpdateProductResponse> {
    const product = await db.products.findByPk(productId, {});
    if (!product) {
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return await product.update({
      product_name: productName,
      price: price,
      branc_id: branchId,
    });
  }

  async deleteProductById(productId: number): Promise<DeleteProductsResponse> {
    const product = await db.products.findByPk(productId, {});
    if (!product) {
      const error: ResponseError = new Error(
        `Товар с таким ID ${productId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const [deleted_product_rows, deleted_inventory_rows] = await Promise.all([
      product.destroy(),
      db.inventories.destroy({
        where: {
          product_id: productId,
        },
      }),
    ]);

    return {
      deleted_product_rows,
      deleted_inventory_rows,
    };
  }
}
