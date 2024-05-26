import { Router } from 'express';
import { EmployeeController } from '../controllers/employees.controller';
import { EmployeeService } from '../services/employees.service';

const employeeService = new EmployeeService();
const employeeController = new EmployeeController(employeeService);

const employeesRouter = Router();

employeesRouter.post(
  '/employees',
  employeeController.createEmployee.bind(employeeController)
);
employeesRouter.get(
  '/employees',
  employeeController.getAllEmployees.bind(employeeController)
);
employeesRouter.get(
  '/employees/:id',
  employeeController.getEmployeeById.bind(employeeController)
);
employeesRouter.put(
  '/employees/:id',
  employeeController.updateEmployeeById.bind(employeeController)
);
employeesRouter.delete(
  '/employees/:id',
  employeeController.deleteEmployeeById.bind(employeeController)
);
employeesRouter.get(
  '/branches/:id/employees',
  employeeController.getEmployeesByBranchId.bind(employeeController)
);

export { employeesRouter };
