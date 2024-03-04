import { InventoryService } from '../services/inventory.service.js';

export class InventoryController {
  constructor() {
    this.inventoryModel = new InventoryModel();
  }

  createInventoryItem = async (req, res) => {
    try {
      const { product_id, quantity_in_stock } = req.body;
      const inventoryId = await this.inventoryModel.createInventoryItem(
        product_id,
        quantity_in_stock
      );
      res
        .status(201)
        .json({ message: 'Запись инвентаря создана', inventoryId });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getAllInventoryItems = async (req, res) => {
    try {
      const inventoryItems = await this.inventoryModel.getAllInventoryItems();
      res.json(inventoryItems);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getInventoryItemById = async (req, res) => {
    const inventoryId = req.params.id;
    try {
      const inventoryItem = await this.inventoryModel.getInventoryItemById(
        inventoryId
      );
      if (inventoryItem === null) {
        res.status(404).json({ error: 'Запись инвентаря не найдена' });
      } else {
        res.json(inventoryItem);
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  updateInventoryItemById = async (req, res) => {
    const inventoryId = req.params.id;
    try {
      const { quantity_in_stock } = req.body;
      const updatedRows = await this.inventoryModel.updateInventoryItemById(
        inventoryId,
        quantity_in_stock
      );
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Запись инвентаря не найдена' });
      } else {
        res.json({ message: 'Запись инвентаря обновлена' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  deleteInventoryItemById = async (req, res) => {
    const inventoryId = req.params.id;
    try {
      const deletedRows = await this.inventoryModel.deleteInventoryItemById(
        inventoryId
      );
      if (deletedRows === 0) {
        res.status(404).json({ error: 'Запись инвентаря не найдена' });
      } else {
        res.json({ message: 'Запись инвентаря удалена' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };
}
