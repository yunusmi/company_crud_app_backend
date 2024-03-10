import { db } from '../models';
import { GetBranchesResponse } from '../utils/interfaces';
import { ResponseError } from '../middlewares/errorHandler';

export class BranchService {
  async createBranch(branchName: string): Promise<number> {
    const { branch_id: insertId } = await db.branches.create({
      branch_name: branchName,
    });

    if (!insertId) {
      const error: ResponseError = new Error('Ошибка создания филиала');
      error.statusCode = 500;
      throw error;
    }
    return insertId;
  }

  async getAllBranches(): Promise<GetBranchesResponse[]> {
    const branches = await db.branches.findAll();
    if (!branches) {
      const error: ResponseError = new Error('Ошибка получения данных');
      error.statusCode = 500;
      throw error;
    }
    return branches;
  }

  async getBranchById(branchId: number): Promise<GetBranchesResponse> {
    const branchDetails = await db.branches.findByPk(branchId, {});

    if (!branchDetails) {
      const error: ResponseError = new Error(
        `Филиал с таким ID ${branchId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    return branchDetails;
  }

  async updateBranchById(
    branchId: number,
    updatedBranchName: string
  ): Promise<void> {
    const branch = await db.branches.findByPk(branchId, {});

    if (!branch) {
      const error: ResponseError = new Error(
        `Филиал с таким ID ${branchId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const updatedBranch = branch.update(branchId, {
      branch_name: updatedBranchName,
    });

    if (!updatedBranch) {
      const error: ResponseError = new Error(`Ошибка обновления филиала`);
      error.statusCode = 500;
      throw error;
    }

    return;
  }

  async deleteBranchById(branchId: number): Promise<void> {
    const branch = await db.branches.findByPk(branchId, {});

    if (!branch) {
      const error: ResponseError = new Error(
        `Филиал с таким ID ${branchId} не найден`
      );
      error.statusCode = 404;
      throw error;
    }

    const deleteBranch = await db.branches.destroy({
      where: { branch_id: branchId },
    });

    if (deleteBranch !== 1) {
      const err: ResponseError = new Error('Ошибка удаления филиала');
      err.statusCode = 500;
      throw err;
    }
    return;
  }
}
