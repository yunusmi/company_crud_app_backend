import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Employees extends Model {
  public employee_id!: number;
  public first_name!: string;
  public last_name!: string;
  public branch_id!: number;
}

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
