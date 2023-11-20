import { SalesModel } from './../services/sales.service.js';

export class SalesController {
  constructor() {
    this.salesModel = new SalesModel();
  }

  createSale = async (req, res) => {
    try {
      const saleId = await this.salesModel.createSale(req.body);
      res.status(201).json({ message: 'Продажа создана', saleId });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getAllSales = async (req, res) => {
    try {
      const sales = await this.salesModel.getAllSales();
      res.json(sales);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getSaleById = async (req, res) => {
    const saleId = req.params.id;
    try {
      const sale = await this.salesModel.getSaleById(saleId);
      if (sale === null) {
        res.status(404).json({ error: 'Продажа не найдена' });
      } else {
        res.json(sale);
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  updateSaleById = async (req, res) => {
    const saleId = req.params.id;
    try {
      const updatedRows = await this.salesModel.updateSaleById(saleId, req.body);
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Продажа не найдена' });
      } else {
        res.json({ message: 'Продажа обновлена' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  deleteSaleById = async (req, res) => {
    const saleId = req.params.id;
    try {
      const deletedRows = await this.salesModel.deleteSaleById(saleId);
      if (deletedRows === 0) {
        res.status(404).json({ error: 'Продажа не найдена' });
      } else {
        res.json({ message: 'Продажа удалена' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };
}