import { Request, Response, NextFunction } from 'express';
import { SalesService } from '../services/sales.service';
import {
  CreateSaleRequestBody,
  GetSalesParams,
  UpdateSaleRequestBody,
  UpdateSaleParams,
  DeleteSaleParams,
} from '../utils/interfaces';

export class SalesController {
  private salesService: SalesService;

  constructor(salesService: SalesService) {
    this.salesService = salesService;
  }

  async createSale(
    req: Request<{}, {}, CreateSaleRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { product_id, employee_id, sale_date, quantity } = req.body;
      const saleId = await this.salesService.createSale(
        product_id,
        employee_id,
        sale_date,
        quantity
      );
      res
        .status(201)
        .json({ message: 'Продажа успешно создана', sale_id: saleId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllSales(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const sales = await this.salesService.getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getSaleById(
    req: Request<GetSalesParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = req.params.id;
      const sale = await this.salesService.getSaleById(saleId);
      res.status(200).json(sale);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateSaleById(
    req: Request<UpdateSaleParams, {}, UpdateSaleRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = req.params.id;
      const { product_id, employee_id, sale_date, quantity } = req.body;
      const updatedRows = await this.salesService.updateSaleById(
        saleId,
        product_id,
        employee_id,
        sale_date,
        quantity
      );
      res.status(200).json({
        message: 'Запись продажи успешно обновлена',
        updated_rows: updatedRows,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteSaleById(
    req: Request<DeleteSaleParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const saleId = req.params.id;
      const deletedRows = await this.salesService.deleteSaleById(saleId);
      res
        .status(200)
        .json({
          message: 'Запись продажи успешно удалена',
          deleted_rows: deletedRows,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
