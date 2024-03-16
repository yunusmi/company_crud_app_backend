import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Sales extends Model {
  declare sale_id: number;
  declare product_id: number;
  declare employee_id: number;
  declare sale_date: string;
  declare quantity: number;
}

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
    modelName: 'sales',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Sales };
