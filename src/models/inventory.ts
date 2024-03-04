import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Inventory extends Model {
  public inventory_id!: number;
  public product_id!: number;
  public quantity_in_stock!: number;
}

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
