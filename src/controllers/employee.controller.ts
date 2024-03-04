import { EmployeeService } from '../services/employee.service.js';

export class EmployeeController {
  constructor() {
    this.employeeModel = new EmployeeModel();
  }

  createEmployee = async (req, res) => {
    try {
      const employeeId = await this.employeeModel.createEmployee(req.body);
      res.status(201).json({ message: 'Сотрудник создан', employeeId });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getAllEmployees = async (req, res) => {
    try {
      const employees = await this.employeeModel.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getEmployeeById = async (req, res) => {
    const employeeId = req.params.id;
    try {
      const employee = await this.employeeModel.getEmployeeById(employeeId);
      if (employee === null) {
        res.status(404).json({ error: 'Сотрудник не найден' });
      } else {
        res.json(employee);
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getEmployeesByBranchId = async (req, res) => {
    const branchId = req.params.id;
    try {
      const employees = await this.employeeModel.getEmployeesByBranchId(
        branchId
      );
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.error(error);
    }
  };

  updateEmployeeById = async (req, res) => {
    const employeeId = req.params.id;
    try {
      const updatedRows = await this.employeeModel.updateEmployeeById(
        employeeId,
        req.body
      );
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Сотрудник не найден' });
      } else {
        res.json({ message: 'Сотрудник обновлен' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  deleteEmployeeById = async (req, res) => {
    const employeeId = req.params.id;
    try {
      const deletedRows = await this.employeeModel.deleteEmployeeById(
        employeeId
      );
      if (deletedRows === 0) {
        res.status(404).json({ error: 'Сотрудник не найден' });
      } else {
        res.json({ message: 'Сотрудник удален' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };
}
