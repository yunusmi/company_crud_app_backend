import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector/index.js';

class Branches extends Model {}

Branches.init(
  {
    branch_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    branch_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'branches',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export { Branches };
