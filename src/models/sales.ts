import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Sales extends Model {
  public sale_id!: number;
  public product_id!: number;
  public employee_id!: number;
  public sale_date!: string;
  public quantity!: number;
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
