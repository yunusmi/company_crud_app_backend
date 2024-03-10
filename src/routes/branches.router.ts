import { Router } from 'express';
import { BranchController } from '../controllers/branches.controller';
import { BranchService } from '../services/branches.service';

const branchController = new BranchController(new BranchService());

const branchesRouter = Router();

branchesRouter.post(
  '/branches',
  branchController.createBranch.bind(branchController)
);
branchesRouter.get(
  '/branches',
  branchController.getAllBranches.bind(branchController)
);
branchesRouter.get(
  '/branches/:id',
  branchController.getBranchById.bind(branchController)
);
branchesRouter.put(
  '/branches/:id',
  branchController.updateBranchById.bind(branchController)
);
branchesRouter.delete(
  '/branches/:id',
  branchController.deleteBranchById.bind(branchController)
);

export { branchesRouter };
