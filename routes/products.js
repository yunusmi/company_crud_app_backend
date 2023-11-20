import { Router } from 'express';
import { ProductController } from './../controllers/productController.js';

const productController = new ProductController();
const productsRouter = Router();

productsRouter.post('/api/products', productController.createProduct);
productsRouter.get('/api/products', productController.getAllProducts);
productsRouter.get('/api/products/:id', productController.getProductById);
productsRouter.put('/api/products/:id', productController.updateProductById);
productsRouter.delete('/api/products/:id', productController.deleteProductById);
productsRouter.get('/api/branches/:id/products', productController.getProductsByBranchId);

export { productsRouter };