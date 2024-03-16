import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Inventories extends Model {
  declare inventory_id: number;
  declare product_id: number;
  declare quantity_in_stock: number;
}

Inventories.init(
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
    modelName: 'inventories',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Inventories };
