import { Router } from 'express';
import { employeesRouter } from './employees.router.js';
import { productsRouter } from './products.router.js';
import { branchesRouter } from './branches.router.js';
import { inventoryRouter } from './inventory.router.js';
import { salesRouter } from './sales.router.js';

const router = Router();

router.use('/api', employeesRouter);
router.use('/api', productsRouter);
router.use('/api', branchesRouter);
router.use('/api', inventoryRouter);
router.use('/api', salesRouter);

export { router as routes };
