import { Router } from 'express';
import { employeesRouter } from './employees.router';
import { productsRouter } from './products.router';
import { branchesRouter } from './branches.router';
import { inventoryRouter } from './inventory.router';
import { salesRouter } from './sales.router';

const router = Router();

router.use('/api', employeesRouter);
router.use('/api', productsRouter);
router.use('/api', branchesRouter);
router.use('/api', inventoryRouter);
router.use('/api', salesRouter);

export { router as routes };
