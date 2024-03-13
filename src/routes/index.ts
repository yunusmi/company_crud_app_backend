import { Router } from 'express';
import { employeesRouter } from './employees.router';
import { productsRouter } from './products.router';
import { branchesRouter } from './branches.router';
import { inventoryRouter } from './inventory.router';
import { salesRouter } from './sales.router';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../utils/swagger-output.json';

const router = Router();

router.use('/api', employeesRouter);
router.use('/api', productsRouter);
router.use('/api', branchesRouter);
router.use('/api', inventoryRouter);
router.use('/api', salesRouter);

if (process.env.NODE_ENV !== 'production') {
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerDocument));
} else {
  router.get('/api-docs', (req, res, next) => {
    next(req);
  });
}

export { router as routes };
