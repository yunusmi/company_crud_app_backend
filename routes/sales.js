import { Router } from 'express';
import { SalesController } from './../controllers/salesController.js';

const salesController = new SalesController();
const salesRouter = Router();

salesRouter.post('/api/sales', salesController.createSale);
salesRouter.get('/api/sales', salesController.getAllSales);
salesRouter.get('/api/sales/:id', salesController.getSaleById);
salesRouter.put('/api/sales/:id', salesController.updateSaleById);
salesRouter.delete('/api/sales/:id', salesController.deleteSaleById);

export { salesRouter };