import { RedisModules, RedisFunctions, RedisScripts } from 'redis';
import { RedisClientType } from '@redis/client';
import { createRedisConnection, dataLiveTime } from '../config/redis';
import { QueryTypes } from 'sequelize';
import { returnException } from '../utils/exception';
import { db } from '../models';
import { ResponseError } from '../middlewares/errorHandler';
import {
  GetEmployeesResponse,
  GetOneEmployeeData,
  UpdateEmployeesResponse,
  RedisMethodsInterface,
} from '../utils/interfaces';
import { sequelize } from '../connector/index';

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
      await returnException('Ошибка создания сотрудника', 500);
    }

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, insertId, branchId);

    await redis.set(
      `employee:${insertId}`,
      JSON.stringify({
        employee_id: insertId,
        first_name: firstName,
        last_name: lastName,
        branch_id: branchId,
      }),
      {
        EX: dataLiveTime,
        NX: true,
      }
    );

    await redis.quit();
    return insertId;
  }

  async getAllEmployees(): Promise<GetEmployeesResponse[]> {
    const redis = await createRedisConnection();
    const employeesCached = await redis.get('employees');

    if (!employeesCached || employeesCached === null) {
      const getEmployeesDataQuery = `
      SELECT employees.*, branches.branch_name
      FROM employees
      JOIN branches ON employees.branch_id = branches.branch_id ORDER BY branch_id DESC`;

      const employeesData = await sequelize.query(getEmployeesDataQuery, {
        type: QueryTypes.SELECT,
      });

      if (!employeesData) {
        await returnException('Ошибка получения данных', 500, redis);
      }

      await redis.set('employees', JSON.stringify(employeesData), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return employeesData as GetEmployeesResponse[];
    }

    await redis.quit();
    return JSON.parse(employeesCached);
  }

  async getEmployeeById(
    employeeId: number
  ): Promise<GetOneEmployeeData | null> {
    const redis = await createRedisConnection();
    const employeeCached = await redis.get(`employee:${employeeId}`);
    if (!employeeCached || employeeCached === null) {
      const employeeData = await db.employees.findByPk(employeeId, {});

      if (!employeeData) {
        await returnException(
          `Сотрудник с таким ID ${employeeId} не найден`,
          404,
          redis
        );
      }

      await redis.set(`employee:${employeeId}`, JSON.stringify(employeeData), {
        EX: dataLiveTime,
        NX: true,
      });

      await redis.quit();
      return employeeData;
    }

    await redis.quit();
    return JSON.parse(employeeCached);
  }

  async getEmployeesByBranchId(
    branchId: number
  ): Promise<GetEmployeesResponse[]> {
    const redis = await createRedisConnection();
    const employeesCached = await redis.get(`branch_employees:${branchId}`);
    if (!employeesCached || employeesCached === null) {
      const employeesData = await db.employees.findAll({
        order: [['branch_id', 'DESC']],
        where: {
          branch_id: branchId,
        },
      });

      if (!employeesData) {
        await returnException(
          `Сотрудник с таким ID филиала ${branchId} не найден`,
          404,
          redis
        );
      }

      await redis.set(
        `branch_employees:${branchId}`,
        JSON.stringify(employeesData),
        {
          EX: dataLiveTime,
          NX: true,
        }
      );

      await redis.quit();
      return employeesData;
    }

    await redis.quit();
    return JSON.parse(employeesCached);
  }

  async updateEmployeeById(
    employeeId: number,
    firstName: string,
    lastName: string,
    branchId: number
  ): Promise<UpdateEmployeesResponse> {
    const transaction = await db.sequelize.transaction();
    const employee = await db.employees.findByPk(employeeId, { transaction });

    if (!employee) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Сотрудник с таким ID ${employeeId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedRows = await employee.update(
      {
        first_name: firstName,
        last_name: lastName,
        branch_id: branchId,
      },
      { transaction }
    );

    if (!updatedRows) {
      await transaction.rollback();
      await returnException('Ошибка обновления сотрудника', 500);
    }

    await transaction.commit();

    const redis = await createRedisConnection();

    await this.deleteCachedData(redis, employeeId, branchId);

    await redis.set(`employee:${employeeId}`, JSON.stringify(updatedRows), {
      EX: dataLiveTime,
      NX: true,
    });

    await redis.quit();
    return updatedRows;
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    const transaction = await db.sequelize.transaction();
    const employee = await db.employees.findByPk(employeeId, { transaction });

    if (!employee) {
      await transaction.rollback();
      const error: ResponseError = new Error(
        `Сотрудник с таким ID ${employeeId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    await employee.destroy({ transaction });
    await transaction.commit();

    const redis = await createRedisConnection();
    await this.deleteCachedData(redis, employeeId, employee.branch_id);
    await redis.quit();
    return;
  }

  async deleteCachedData(
    redis: RedisClientType<
      RedisMethodsInterface & RedisModules,
      RedisFunctions,
      RedisScripts
    >,
    employeeId?: number,
    branchId?: number
  ): Promise<void> {
    const cachedEmployeesDataExcists = await redis.get('employees');

    if (cachedEmployeesDataExcists || cachedEmployeesDataExcists !== null) {
      const deleteCachedData = await redis.del('employees');

      if (!deleteCachedData) {
        await returnException(`Ошибка Redis`, 500);
      }
    }

    if (employeeId) {
      const cachedOneEmployeeDataExcists = await redis.get(
        `employee:${employeeId}`
      );

      if (
        cachedOneEmployeeDataExcists ||
        cachedOneEmployeeDataExcists !== null
      ) {
        const deleteCachedData = await redis.del(`employee:${employeeId}`);

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    if (branchId) {
      const cachedEmployeesOfBranchDataExcists = await redis.get(
        `branch_employees:${branchId}`
      );

      if (
        cachedEmployeesOfBranchDataExcists ||
        cachedEmployeesOfBranchDataExcists !== null
      ) {
        const deleteCachedData = await redis.del(
          `branch_employees:${branchId}`
        );

        if (!deleteCachedData) {
          await returnException(`Ошибка Redis`, 500);
        }
      }
    }

    return;
  }
}
