import { Router } from 'express';
import { ProductController } from '../controllers/products.controller.js';

const productController = new ProductController();
const productsRouter = Router();

productsRouter.post('/products', productController.createProduct);
productsRouter.get('/products', productController.getAllProducts);
productsRouter.get('/products/:id', productController.getProductById);
productsRouter.put('/products/:id', productController.updateProductById);
productsRouter.delete('/products/:id', productController.deleteProductById);
productsRouter.get(
  '/branches/:id/products',
  productController.getProductsByBranchId
);

export { productsRouter };
