import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/products.service';
import {
  CreateProductRequestBody,
  GetProductsParams,
  UpdateProductParams,
  UpdateProductRequestBody,
  DeleteProductParams,
} from '../utils/interfaces';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  async createProduct(
    req: Request<{}, {}, CreateProductRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const defaultProductQuantity = 100;
      const { product_name, price, branch_id } = req.body;
      const productId = await this.productService.createProduct(
        defaultProductQuantity,
        product_name,
        price,
        branch_id
      );
      res
        .status(201)
        .json({ message: 'Товар успешно создан', product_id: productId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProductById(
    req: Request<GetProductsParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const product = await this.productService.getProductById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProductsByBranchId(
    req: Request<GetProductsParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const branchId = req.params.id;
      const products = await this.productService.getProductsByBranchId(
        branchId
      );
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateProductById(
    req: Request<UpdateProductParams, {}, UpdateProductRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const { product_name, price, branch_id } = req.body;
      const updatedRows = await this.productService.updateProductById(
        productId,
        product_name,
        price,
        branch_id
      );
      res
        .status(200)
        .json({ message: 'Товар успешно обновлен', updated_rows: updatedRows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteProductById(
    req: Request<DeleteProductParams, {}, {}>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const productId = req.params.id;
      const deletedRows = await this.productService.deleteProductById(
        productId
      );
      res.status(200).json({ message: 'Товар успешно удален', deletedRows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
