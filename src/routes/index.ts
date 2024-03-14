import { Router } from 'express';
import { employeesRouter } from './employees.router';
import { productsRouter } from './products.router';
import { branchesRouter } from './branches.router';
import { inventoryRouter } from './inventory.router';
import { salesRouter } from './sales.router';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../utils/swagger/swagger-api.json';

const router = Router();

router.use('/api/v1', employeesRouter);
router.use('/api/v1', productsRouter);
router.use('/api/v1', branchesRouter);
router.use('/api/v1', inventoryRouter);
router.use('/api/v1', salesRouter);

if (process.env.NODE_ENV !== 'production') {
  router.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  router.get('/api-docs/v1', (req, res, next) => {
    next(req);
  });
}

export { router as routes };
