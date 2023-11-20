import { Router } from 'express';
import { InventoryController } from './../controllers/inventoryController.js';

const inventoryRouter = Router();
const inventoryController = new InventoryController();

inventoryRouter.post('/api/inventory', inventoryController.createInventoryItem);
inventoryRouter.get('/api/inventory', inventoryController.getAllInventoryItems);
inventoryRouter.get('/api/inventory/:id', inventoryController.getInventoryItemById);
inventoryRouter.put('/api/inventory/:id', inventoryController.updateInventoryItemById);
inventoryRouter.delete('/api/inventory/:id', inventoryController.deleteInventoryItemById);

export { inventoryRouter };