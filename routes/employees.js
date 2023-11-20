import { Router } from 'express';
import { EmployeeController } from './../controllers/employeeController.js';
const employeeController = new EmployeeController();

const employeesRouter = Router();

employeesRouter.post('/api/employees', employeeController.createEmployee);
employeesRouter.get('/api/employees', employeeController.getAllEmployees);
employeesRouter.get('/api/employees/:id', employeeController.getEmployeeById);
employeesRouter.put('/api/employees/:id', employeeController.updateEmployeeById);
employeesRouter.delete('/api/employees/:id', employeeController.deleteEmployeeById);
employeesRouter.get('/api/branches/:id/employees', employeeController.getEmployeesByBranchId);

export { employeesRouter };