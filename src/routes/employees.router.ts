import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller.js';
const employeeController = new EmployeeController();

const employeesRouter = Router();

employeesRouter.post('/employees', employeeController.createEmployee);
employeesRouter.get('/employees', employeeController.getAllEmployees);
employeesRouter.get('/employees/:id', employeeController.getEmployeeById);
employeesRouter.put('/employees/:id', employeeController.updateEmployeeById);
employeesRouter.delete('/employees/:id', employeeController.deleteEmployeeById);
employeesRouter.get(
  '/branches/:id/employees',
  employeeController.getEmployeesByBranchId
);

export { employeesRouter };
