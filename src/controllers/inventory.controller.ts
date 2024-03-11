import { Request, Response, NextFunction } from 'express';
import { InventoryService } from '../services/inventory.service';
import {
  CreateInventoryRequestBody,
  GetInventoryDataParams,
  UpdateInventoryDataParams,
  UpdateInventoryRequestBody,
  DeleteInventoryParams,
} from '../utils/interfaces';

export class InventoryController {
  private inventoryService: InventoryService;

  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;
  }

  async createInventoryItem(
    req: Request<{}, {}, CreateInventoryRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { product_id, quantity_in_stock } = req.body;
      const inventoryId = await this.inventoryService.createInventoryItem(
        product_id,
        quantity_in_stock
      );
      res.status(201).json({
        message: 'Запись инвентаря создана',
        inventory_id: inventoryId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllInventoryItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventoryItems = await this.inventoryService.getAllInventoryItems();
      res.status(200).json(inventoryItems);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getInventoryItemById(
    req: Request<GetInventoryDataParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventoryId = req.params.id;
      const inventoryItem = await this.inventoryService.getInventoryItemById(
        inventoryId
      );
      res.status(200).json(inventoryItem);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateInventoryItemById(
    req: Request<UpdateInventoryDataParams, {}, UpdateInventoryRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventoryId = req.params.id;
      const { quantity_in_stock } = req.body;
      const updateInventory =
        await this.inventoryService.updateInventoryItemById(
          inventoryId,
          quantity_in_stock
        );
      res.status(200).json(updateInventory);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteInventoryItemById(
    req: Request<DeleteInventoryParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventoryId = req.params.id;
      const deleteInventory =
        await this.inventoryService.deleteInventoryItemById(inventoryId);
      res.status(200).json({
        message: 'Запись инвентаря удалена',
        deleted_data: deleteInventory,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
