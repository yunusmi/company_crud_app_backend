import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetEmployeesResponse,
  GetOneEmployeeData,
  UpdateEmployeesResponse,
} from '../utils/interfaces';
import { sequelize } from '../connector/index';
import { QueryTypes } from 'sequelize';

export class EmployeeService {
  async createEmployee(
    firstName: string,
    lastName: string,
    branchId: number
  ): Promise<number> {
    const { employee_id: insertId } = await db.employees.create({
      first_name: firstName,
      last_name: lastName,
      branch_id: branchId,
    });

    if (!insertId) {
      const error: ResponseError = new Error('Ошибка создания сотрудника');
      error.statusCode = 500;
      throw error;
    }

    return insertId;
  }

  async getAllEmployees(): Promise<GetEmployeesResponse[]> {
    const getEmployeesDataQuery = `
      SELECT employees.*, branches.branch_name
      FROM employees
      JOIN branches ON employees.branch_id = branches.branch_id ORDER BY branch_id DESC`;

    const employeesData = await sequelize.query(getEmployeesDataQuery, {
      type: QueryTypes.SELECT,
    });

    if (!employeesData) {
      const error: ResponseError = new Error('Ошибка получения данных');
      error.statusCode = 500;
      throw error;
    }

    return employeesData as GetEmployeesResponse[];
  }

  async getEmployeeById(employeeId: number): Promise<GetOneEmployeeData> {
    const employeesData = await db.employees.findByPk(employeeId, {});

    if (!employeesData) {
      const error: ResponseError = new Error(
        `Сотрудник с таким ID ${employeeId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return employeesData;
  }

  async getEmployeesByBranchId(
    branchId: number
  ): Promise<GetEmployeesResponse[]> {
    const employeesData = await db.employees.findAll({
      order: [['branch_id', 'DESC']],
      where: {
        branch_id: branchId,
      },
    });

    if (!employeesData) {
      const error: ResponseError = new Error(
        `Сотрудники с таким branch_id ${branchId} не найдены`
      );
      error.statusCode = 404;
      throw error;
    }

    return employeesData;
  }

  async updateEmployeeById(
    employeeId: number,
    firstName: string,
    lastName: string,
    branchId: number
  ): Promise<UpdateEmployeesResponse> {
    const employee = await db.employees.findByPk(employeeId, {});

    if (!employee) {
      const error: ResponseError = new Error(
        `Сотрудник с таким ID ${employeeId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedRows = await employee.update({
      first_name: firstName,
      last_name: lastName,
      branch_id: branchId,
    });

    return updatedRows;
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    const employee = await db.employees.findByPk(employeeId, {});

    if (!employee) {
      const error: ResponseError = new Error(
        `Сотрудник с таким ID ${employeeId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return await employee.destroy();
  }
}
