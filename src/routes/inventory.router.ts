import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { InventoryService } from '../services/inventory.service';

const inventoryController = new InventoryController(new InventoryService());
const inventoryRouter = Router();

inventoryRouter.post(
  '/inventory',
  inventoryController.createInventoryItem.bind(inventoryController)
);
inventoryRouter.get(
  '/inventory',
  inventoryController.getAllInventoryItems.bind(inventoryController)
);
inventoryRouter.get(
  '/inventory/:id',
  inventoryController.getInventoryItemById.bind(inventoryController)
);
inventoryRouter.put(
  '/inventory/:id',
  inventoryController.updateInventoryItemById.bind(inventoryController)
);
inventoryRouter.delete(
  '/inventory/:id',
  inventoryController.deleteInventoryItemById.bind(inventoryController)
);

export { inventoryRouter };
