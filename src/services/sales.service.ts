import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { createRedisConnection, dataLiveTime } from '../config/redis';
import { returnException } from '../utils/exception';
import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetSalesResponse,
  UpdateSaleResponse,
  RedisMethodsInterface,
} from '../utils/interfaces';
import { InventoryService } from './inventory.service';

export class SalesService {
  private inventoryService: InventoryService;

  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;
  }

  async createSale(
    productId: number,
    employeeId: number,
    saleDate: string,
    quantity: number
  ): Promise<number> {
    const transaction = await db.sequelize.transaction();
    const { sale_id: saleId } = await db.sales.create(
      {
        product_id: productId,
        employee_id: employeeId,
        sale_date: saleDate,
        quantity: quantity,
      },
      { transaction }
    );

    if (!saleId) {
      await transaction.rollback();
      await returnException('Ошибка создания записи продаж', 500);
    }

    // Уменьшает кол-во остатка на складе после продажи товара
    const inventoryId = await this.inventoryService.decreaseQtyAfterSale(
      productId,
      0,
      quantity
    );

    if (!inventoryId) {
      await transaction.rollback();
      await returnException('Ошибка создания записи продаж', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, saleId);

    await redis.set(
      `sale:${saleId}`,
      JSON.stringify({
        sale_id: saleId,
        product_id: productId,
        employee_id: employeeId,
        sale_date: saleDate,
        quantity: quantity,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();

    return saleId;
  }

  async getAllSales(): Promise<GetSalesResponse[]> {
    const redis = await createRedisConnection();
    const salesCached = await redis.get(`sales`);

    if (!salesCached || salesCached === null) {
      const sales = await db.sales.findAll({
        order: [['sale_id', 'DESC']],
      });

      if (!sales) {
        await returnException('Ошибка получения записей продаж', 500, redis);
      }

      await redis.set('sales', JSON.stringify(sales), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return sales;
    }

    await redis.quit();
    return JSON.parse(salesCached);
  }

  async getSaleById(saleId: number): Promise<GetSalesResponse | null> {
    const redis = await createRedisConnection();
    const saleCached = await redis.get(`sale:${saleId}`);

    if (!saleCached || saleCached === null) {
      const saleItem = await db.sales.findByPk(saleId, {});

      if (!saleItem) {
        await returnException(`Запись продажи не найдена`, 404, redis);
      }

      await redis.set(`sale:${saleId}`, JSON.stringify(saleItem), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return saleItem;
    }
    await redis.quit();
    return JSON.parse(saleCached);
  }

  async updateSaleById(
    saleId: number,
    productId: number,
    employeeId: number,
    saleDate: string,
    quantity: number
  ): Promise<UpdateSaleResponse> {
    const transaction = await db.sequelize.transaction();
    const sale = await db.sales.findByPk(saleId, { transaction });
    if (!sale) {
      await transaction.rollback();
      const error: ResponseError = new Error('Запись продажи не найдена');
      error.statusCode = 404;
      throw error;
    }

    const excistingSaledProductQty = sale.dataValues.quantity;

    await this.inventoryService.decreaseQtyAfterSale(
      productId,
      excistingSaledProductQty,
      quantity
    );

    const updatedRows = await sale.update(
      {
        product_id: productId,
        employee_id: employeeId,
        sale_date: saleDate,
        quantity: quantity,
      },
      { transaction }
    );

    if (!updatedRows) {
      await transaction.rollback();
      await returnException('Ошибка обновления записи продаж', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();

    await this.deleteCachedData(redis, saleId);

    await redis.set(`sale:${saleId}`, JSON.stringify(updatedRows), {
      EX: dataLiveTime,
      NX: true,
    });

    await redis.quit();
    return updatedRows;
  }

  async deleteSaleById(saleId: number): Promise<void> {
    const transaction = await db.sequelize.transaction();
    const sale = await db.sales.findByPk(saleId, { transaction });
    if (!sale) {
      await transaction.rollback();
      const error: ResponseError = new Error('Запись продажи не найдена');
      error.statusCode = 500;
      throw error;
    }

    const deletedRows = await sale.destroy({ transaction });
    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, saleId);
    await redis.quit();

    return deletedRows;
  }

  async deleteCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    saleId?: number
  ): Promise<void> {
    const cachedInventoriesDataExcists = await redis.get('sales');

    if (cachedInventoriesDataExcists || cachedInventoriesDataExcists !== null) {
      const deleteCachedData = await redis.del('sales');

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
      }
    }

    if (saleId) {
      const cachedOneInventoryDataExcists = await redis.get(`sale:${saleId}`);

      if (
        cachedOneInventoryDataExcists ||
        cachedOneInventoryDataExcists !== null
      ) {
        const deleteCachedData = await redis.del(`sale:${saleId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    return;
  }
}
