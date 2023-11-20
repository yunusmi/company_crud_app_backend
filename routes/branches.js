import { Router } from 'express';
import { BranchController } from './../controllers/branchController.js';
const branchController = new BranchController();

const branchesRouter = Router();

branchesRouter.post('/api/branches', branchController.createBranch);
branchesRouter.get('/api/branches', branchController.getAllBranches);
branchesRouter.get('/api/branches/:id', branchController.getBranchById);
branchesRouter.put('/api/branches/:id', branchController.updateBranchById);
branchesRouter.delete('/api/branches/:id', branchController.deleteBranchById);

export { branchesRouter };