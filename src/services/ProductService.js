const ProductModel = require("../models/productModel");

const createProduct = async ({
  productName,
  categoryId,
  packSize,
  price,
  productImage,
  status,
}) => {
  const newProduct = new ProductModel({
    productName,
    categoryId,
    packSize,
    price,
    productImage,
    status: status || false,
  });
  return await newProduct.save();
};

const updateProduct = async ({
  productId,
  categoryId,
  categoryName,
  packSize,
  price,
  productImage,
  status,
}) => {
  return await ProductModel.findByIdAndUpdate(
    productId,
    {
      productName,
      categoryId,
      packSize,
      price,
      productImage,
      status,
    },
    { new: true }
  );
};

const deleteProduct = async (productId) => {
  return await ProductModel.findByIdAndDelete(productId);
};

const getProducts = async () => {
  return await ProductModel.find();
};

const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
};
