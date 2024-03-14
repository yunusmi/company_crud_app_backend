import { Request, Response, NextFunction } from 'express';
import { BranchService } from '../services/branches.service';
import {
  BranchRequestParams,
  CreateBranchRequestBody,
  UpdateBranchRequestBody,
} from '../utils/interfaces';

export class BranchController {
  private branchService: BranchService;

  constructor(branchService: BranchService) {
    this.branchService = branchService;
  }

  async createBranch(
    req: Request<{}, {}, CreateBranchRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchName = req.body.branch_name;
      const branchId = await this.branchService.createBranch(branchName);
      res
        .status(201)
        .json({ message: 'Филиал успешно создан', branch_id: branchId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllBranches(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branches = await this.branchService.getAllBranches();
      res.status(200).json(branches);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getBranchById(
    req: Request<BranchRequestParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = req.params.id;
      const branch = await this.branchService.getBranchById(branchId);
      res.status(200).json(branch);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateBranchById(
    req: Request<BranchRequestParams, {}, UpdateBranchRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = req.params.id;
      const updatedBranchName = req.body.branch_name;
      await this.branchService.updateBranchById(branchId, updatedBranchName);
      res.status(200).json({ message: 'Филиал успешно обновлен' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteBranchById(
    req: Request<BranchRequestParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = req.params.id;
      await this.branchService.deleteBranchById(branchId);
      res.status(200).json({ message: 'Филиал успешно удален' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
