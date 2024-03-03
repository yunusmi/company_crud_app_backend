import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector/index.js';

class Inventory extends Model {}

Inventory.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity_in_stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'inventory',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Inventory };
