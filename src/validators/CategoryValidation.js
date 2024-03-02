const { body, param, validationResult } = require("express-validator");
const { getCategoryByName } = require("../services/CategoryService");

const isCategoryNameUnique = async (value) => {
  const category = await getCategoryByName(value);
  if (category) {
    return Promise.reject("Category name must be unique");
  }
  return Promise.resolve();
};

const createCategoryRules = [
  body("categoryName")
    .notEmpty().withMessage("Category name is required")
    .custom(isCategoryNameUnique),
  body("description").notEmpty().withMessage("Description is required"),
  body("status").optional().isBoolean().withMessage("Status must be a boolean"),
];

const updateCategoryRules = [
  param("categoryId").notEmpty().withMessage("Category ID is required"),
  ...createCategoryRules,
];

const deleteCategoryRules = [
  param("categoryId").notEmpty().withMessage("Category ID is required"),
];

const validateCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

module.exports = {
  createCategoryRules,
  updateCategoryRules,
  deleteCategoryRules,
  validateCategory,
};
