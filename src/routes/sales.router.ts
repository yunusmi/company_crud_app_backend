import { Router } from 'express';
import { SalesController } from '../controllers/sales.controller.js';

const salesController = new SalesController();
const salesRouter = Router();

salesRouter.post('/sales', salesController.createSale);
salesRouter.get('/sales', salesController.getAllSales);
salesRouter.get('/sales/:id', salesController.getSaleById);
salesRouter.put('/sales/:id', salesController.updateSaleById);
salesRouter.delete('/sales/:id', salesController.deleteSaleById);

export { salesRouter };
