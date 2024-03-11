import { Op } from 'sequelize';
import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetInventoriesResponse,
  UpdateInventoryResponse,
} from '../utils/interfaces';

export class InventoryService {
  async createInventoryItem(
    productId: number,
    quantityInStock: number
  ): Promise<number> {
    const { inventory_id: insertId } = await db.inventories.create({
      product_id: productId,
      quantity_in_stock: quantityInStock,
    });

    if (!insertId) {
      const error: ResponseError = new Error('Ошибка создания инвентаря');
      error.statusCode = 500;
      throw error;
    }

    return insertId;
  }

  async getAllInventoryItems(): Promise<GetInventoriesResponse[]> {
    const inventoryItems = await db.inventories.findAll();
    if (!inventoryItems) {
      const error: ResponseError = new Error('Ошибка получения данных');
      error.statusCode = 500;
      throw error;
    }

    return inventoryItems;
  }

  async getInventoryItemById(
    inventoryId: number
  ): Promise<GetInventoriesResponse> {
    const inventoryItem = await db.inventories.findOne({
      where: {
        inventory_id: inventoryId,
        quantity_in_stock: { [Op.gt]: 0 },
      },
    });

    if (!inventoryItem) {
      const error: ResponseError = new Error(
        `Запись с таким ID ${inventoryId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return inventoryItem;
  }

  async updateInventoryItemById(
    inventoryId: number,
    quantityInStock: number
  ): Promise<UpdateInventoryResponse> {
    const inventoryData = await db.inventories.findOne({
      where: {
        inventory_id: inventoryId,
      },
    });

    if (!inventoryData) {
      const error: ResponseError = new Error(
        `Запись с таким ID ${inventoryId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return await inventoryData.update({ quantity_in_stock: quantityInStock });
  }

  async deleteInventoryItemById(inventoryId: number): Promise<void> {
    const inventory = await db.inventories.findByPk(inventoryId, {});

    if (!inventory) {
      const error: ResponseError = new Error(
        `Запись с таким ID ${inventoryId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return await inventory.destroy();
  }
}
