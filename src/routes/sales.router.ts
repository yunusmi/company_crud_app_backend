import { Router } from 'express';
import { SalesController } from '../controllers/sales.controller';
import { SalesService } from '../services/sales.service';
import { InventoryService } from '../services/inventory.service';

const inventoryService = new InventoryService();
const salesService = new SalesService(inventoryService);
const salesController = new SalesController(salesService);
const salesRouter = Router();

salesRouter.post('/sales', salesController.createSale.bind(salesController));
salesRouter.get('/sales', salesController.getAllSales.bind(salesController));
salesRouter.get(
  '/sales/:id',
  salesController.getSaleById.bind(salesController)
);
salesRouter.put(
  '/sales/:id',
  salesController.updateSaleById.bind(salesController)
);
salesRouter.delete(
  '/sales/:id',
  salesController.deleteSaleById.bind(salesController)
);

export { salesRouter };
