import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector/index.js';

class Employees extends Model {}

Employees.init(
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'employees',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Employees };
