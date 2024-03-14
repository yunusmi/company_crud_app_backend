import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import { GetSalesResponse, UpdateSaleResponse } from '../utils/interfaces';
import { InventoryService } from '../services/inventory.service';

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
    const { sale_id: saleId } = await db.sales.create({
      product_id: productId,
      employee_id: employeeId,
      sale_date: saleDate,
      quantity: quantity,
    });

    if (!saleId) {
      const error: ResponseError = new Error('Ошибка создания записи продаж');
      error.statusCode = 500;
      throw error;
    }

    // Уменьшает кол-во остатка на складе после продажи товара
    await this.inventoryService.decreaseQtyAfterSale(productId, 0, quantity);

    return saleId;
  }

  async getAllSales(): Promise<GetSalesResponse[]> {
    const sales = await db.sales.findAll();
    if (!sales) {
      const error: ResponseError = new Error('Ошибка получения записей продаж');
      error.statusCode = 500;
      throw error;
    }

    return sales;
  }

  async getSaleById(saleId: number): Promise<GetSalesResponse> {
    const sale = await db.sales.findByPk(saleId, {});
    if (!sale) {
      const error: ResponseError = new Error('Запись продажи не найдена');
      error.statusCode = 404;
      throw error;
    }

    return sale;
  }

  async updateSaleById(
    saleId: number,
    productId: number,
    employeeId: number,
    saleDate: string,
    quantity: number
  ): Promise<UpdateSaleResponse> {
    const sale = await db.sales.findByPk(saleId, {});
    if (!sale) {
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

    return await sale.update({
      product_id: productId,
      employee_id: employeeId,
      sale_date: saleDate,
      quantity: quantity,
    });
  }

  async deleteSaleById(saleId: number): Promise<void> {
    const sale = await db.sales.findByPk(saleId, {});
    if (!sale) {
      const error: ResponseError = new Error('Запись продажи не найдена');
      error.statusCode = 500;
      throw error;
    }

    return await sale.destroy();
  }
}
