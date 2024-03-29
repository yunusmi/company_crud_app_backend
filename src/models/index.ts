import { sequelize } from '../connector';
import { Branches } from './branches';
import { Employees } from './employees';
import { Inventories } from './inventories';
import { Products } from './products';
import { Sales } from './sales';

const db = {
  sequelize: sequelize,
  branches: Branches,
  employees: Employees,
  inventories: Inventories,
  products: Products,
  sales: Sales,
};

db.branches.hasMany(db.employees, { foreignKey: 'branch_id' });
db.employees.belongsTo(db.branches, { foreignKey: 'branch_id' });

db.employees.hasMany(db.sales, { foreignKey: 'employee_id' });
db.sales.belongsTo(db.employees, { foreignKey: 'employee_id' });

db.products.hasMany(db.inventories, { foreignKey: 'product_id' });
db.inventories.belongsTo(db.products, { foreignKey: 'product_id' });

db.products.hasMany(db.sales, { foreignKey: 'product_id' });
db.sales.belongsTo(db.products, { foreignKey: 'product_id' });

export { db };
