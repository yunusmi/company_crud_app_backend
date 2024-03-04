import { Router } from 'express';
import { BranchController } from '../controllers/branch.controller.js';
const branchController = new BranchController();

const branchesRouter = Router();

branchesRouter.post('/branches', branchController.createBranch);
branchesRouter.get('/branches', branchController.getAllBranches);
branchesRouter.get('/branches/:id', branchController.getBranchById);
branchesRouter.put('/branches/:id', branchController.updateBranchById);
branchesRouter.delete('/branches/:id', branchController.deleteBranchById);

export { branchesRouter };
