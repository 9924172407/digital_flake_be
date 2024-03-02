const CategoryModel = require("../models/categoryModel");
const ProductService = require("../services/productService");

const createProduct = async (req, res, next) => {
  try {
    const productName = req.body.productName;
    const categoryId = req.body.categoryId;
    const packSize = req.body.packSize;
    const price = req.body.price;
    const status = req.body.status;
    const productImage = req.file.path;

    const newProduct = await ProductService.createProduct({
      productName,
      categoryId,
      packSize,
      price,
      productImage,
      status,
    });
    res.status(200).json({
      status: 200,
      data: newProduct,
      message: "Product Add Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { productName, categoryName, packSize, price, productImage, status } =
      req.body;

    const updatedProduct = await ProductService.updateProduct({
      productId,
      productName,
      categoryName,
      packSize,
      price,
      productImage,
      status,
    });

    res.status(200).json({
      status: 200,
      data: updatedProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    console.log(req.params);

    await ProductService.deleteProduct(productId);

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await ProductService.getProducts();

    const productsWithCategoryName = await Promise.all(
      products.map(async (product) => {
        const category = await CategoryModel.findById(product.categoryId);
        return {
          ...product._doc,
          categoryName: category ? category.categoryName : null,
        };
      })
    );

    res.status(200).json({
      status: 200,
      data: productsWithCategoryName,
      message: "Product Fetch Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await ProductService.getProductById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
