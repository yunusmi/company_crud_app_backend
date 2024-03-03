import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller.js';

const inventoryRouter = Router();
const inventoryController = new InventoryController();

inventoryRouter.post('/inventory', inventoryController.createInventoryItem);
inventoryRouter.get('/inventory', inventoryController.getAllInventoryItems);
inventoryRouter.get('/inventory/:id', inventoryController.getInventoryItemById);
inventoryRouter.put(
  '/inventory/:id',
  inventoryController.updateInventoryItemById
);
inventoryRouter.delete(
  '/inventory/:id',
  inventoryController.deleteInventoryItemById
);

export { inventoryRouter };
