import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Products extends Model {
  declare product_id: number;
  declare product_name: string;
  declare price: number;
  declare branch_id: number;
}

Products.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'products',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Products };
