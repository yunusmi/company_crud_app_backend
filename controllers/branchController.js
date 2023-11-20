import { BranchModel } from './../services/branch.service.js';

export class BranchController {
  constructor() {
    this.branchModel = new BranchModel();
  }

  createBranch = async (req, res) => {
    try {
      const branchId = await this.branchModel.createBranch(req.body);
      res.status(201).json({ message: 'Филиал создан', branchId });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getAllBranches = async (req, res) => {
    try {
      const branches = await this.branchModel.getAllBranches();
      res.json(branches);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getBranchById = async (req, res) => {
    const branchId = req.params.id;
    try {
      const branch = await this.branchModel.getBranchById(branchId);
      if (branch === null) {
        res.status(404).json({ error: 'Филиал не найден' });
      } else {
        res.json(branch);
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  updateBranchById = async (req, res) => {
    const branchId = req.params.id;
    try {
      const updatedRows = await this.branchModel.updateBranchById(branchId, req.body);
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Филиал не найден' });
      } else {
        res.json({ message: 'Филиал обновлен' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  deleteBranchById = async (req, res) => {
    const branchId = req.params.id;
    try {
      const deletedRows = await this.branchModel.deleteBranchById(branchId);
      if (deletedRows === 0) {
        res.status(404).json({ error: 'Филиал не найден' });
      } else {
        res.json({ message: 'Филиал удален' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };
}