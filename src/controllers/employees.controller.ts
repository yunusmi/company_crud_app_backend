import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employees.service';
import {
  CreateEmployeeRequestBody,
  UpdateEmployeeRequestBody,
  UpdateEmployeeParams,
  DeleteEmployeeParams,
  GetEmployeesParams,
} from '../utils/interfaces';

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  async createEmployee(
    req: Request<{}, {}, CreateEmployeeRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { first_name, last_name, branch_id } = req.body;

      const employeeId = await this.employeeService.createEmployee(
        first_name,
        last_name,
        branch_id
      );
      res
        .status(201)
        .json({ message: 'Сотрудник создан', employee_id: employeeId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employees = await this.employeeService.getAllEmployees();
      res.status(200).json(employees);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getEmployeeById(
    req: Request<GetEmployeesParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const employeeId = req.params.id;
    try {
      const employeeData = await this.employeeService.getEmployeeById(
        employeeId
      );
      res.status(200).json(employeeData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getEmployeesByBranchId(
    req: Request<GetEmployeesParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = req.params.id;
      const employeeData = await this.employeeService.getEmployeesByBranchId(
        branchId
      );
      res.status(200).json(employeeData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateEmployeeById(
    req: Request<UpdateEmployeeParams, {}, UpdateEmployeeRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const employeeId = req.params.id;
      const { first_name, last_name, branch_id } = req.body;

      await this.employeeService.updateEmployeeById(
        employeeId,
        first_name,
        last_name,
        branch_id
      );
      res.status(200).json({ message: 'Сотрудник обновлен' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteEmployeeById(
    req: Request<DeleteEmployeeParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const employeeId = req.params.id;
    try {
      await this.employeeService.deleteEmployeeById(employeeId);
      res.status(200).json({ message: 'Сотрудник удален' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
