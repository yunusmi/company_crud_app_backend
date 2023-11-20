import { Router } from 'express';
import { employeesRouter } from './employees.js';
import { productsRouter } from './products.js';
import { branchesRouter } from './branches.js';
import { inventoryRouter } from './inventory.js';
import { salesRouter } from './sales.js';

const router = Router();

router.use('/', employeesRouter);
router.use('/', productsRouter);
router.use('/', branchesRouter);
router.use('/', inventoryRouter);
router.use('/', salesRouter);

export { router as routes };