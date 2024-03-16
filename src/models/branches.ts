import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../connector';

class Branches extends Model {
  declare branch_id: number;
  declare branch_name: string;
}

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
