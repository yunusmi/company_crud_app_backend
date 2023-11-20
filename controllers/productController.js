import { ProductModel } from './../services/product.service.js';

export class ProductController {
  constructor() {
    this.productModel = new ProductModel();
  }

  createProduct = async (req, res) => {
    try {
      const productId = await this.productModel.createProduct(req.body);
      res.status(201).json({ message: 'Товар создан', productId });
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productModel.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await this.productModel.getProductById(productId);
      if (product === null) {
        res.status(404).json({ error: 'Товар не найден' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

    getProductsByBranchId = async (req, res) => {
      const branchId = req.params.id;
      try {
        const products = await this.productModel.getProductsByBranchId(branchId);
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        console.error(error);
      }
    };

  updateProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const updatedRows = await this.productModel.updateProductById(productId, req.body);
      if (updatedRows === 0) {
        res.status(404).json({ error: 'Товар не найден' });
      } else {
        res.json({ message: 'Товар обновлен' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };

  deleteProductById = async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedRows = await this.productModel.deleteProductById(productId);
      if (deletedRows === 0) {
        res.status(404).json({ error: 'Товар не найден' });
      } else {
        res.json({ message: 'Товар удален' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
      console.log(error);
    }
  };
}