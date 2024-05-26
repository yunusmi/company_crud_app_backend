import { Router } from 'express';
import { ProductController } from '../controllers/products.controller';
import { ProductService } from '../services/products.service';
import { InventoryService } from '../services/inventory.service';

const inventoryService = new InventoryService();
const productService = new ProductService(inventoryService);

const productController = new ProductController(productService);

const productsRouter = Router();

productsRouter.post(
  '/products',
  productController.createProduct.bind(productController)
);
productsRouter.get(
  '/products',
  productController.getAllProducts.bind(productController)
);
productsRouter.get(
  '/products/:id',
  productController.getProductById.bind(productController)
);
productsRouter.put(
  '/products/:id',
  productController.updateProductById.bind(productController)
);
productsRouter.delete(
  '/products/:id',
  productController.deleteProductById.bind(productController)
);
productsRouter.get(
  '/branches/:id/products',
  productController.getProductsByBranchId.bind(productController)
);

export { productsRouter };
