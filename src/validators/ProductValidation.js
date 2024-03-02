const { body, param, validationResult } = require("express-validator");
const CategoryModel = require("../models/categoryModel");
const createProductRules = [
  body("productName").notEmpty().withMessage("Product name is required"),
  body("packSize").isNumeric().withMessage("Pack size must be a number"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("status").optional().isBoolean().withMessage("Status must be a boolean"),
  body("categoryId").custom(async (value) => {
    const category = await CategoryModel.findById(value);
    if (!category) {
      throw new Error("Invalid categoryId");
    }
  }),
];

const updateProductRules = [
  param("productId").notEmpty().withMessage("Product ID is required"),
  ...createProductRules,
  body("categoryId").custom(async (value) => {
    const category = await CategoryModel.findById(value);
    if (!category) {
      throw new Error("Invalid categoryId. Category not found.");
    }
  }),
];

const deleteProductRules = [
  param("productId").notEmpty().withMessage("Product ID is required"),
];

const validateProductImage = (req, res, next) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Product image is required" });
  }
  next();
};

const validateProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = {
  createProductRules,
  updateProductRules,
  deleteProductRules,
  validateProduct,
  validateProductImage,
};
