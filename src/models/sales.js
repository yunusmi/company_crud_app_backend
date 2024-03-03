import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector/index.js';

class Sales extends Model {}

Sales.init(
  {
    sale_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sale_date: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Sales',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Sales };
