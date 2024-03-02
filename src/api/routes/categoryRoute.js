const express = require("express");
const categoryController = require("../../controllers/CategoryController");
const catchValidationError = require("../../utils/catchValidationError");
const categoryValidation = require("../../validators/CategoryValidation");
const authenticateUser = require("../../middlewares/auth");
const router = express.Router();

router.use(authenticateUser);

router
  .route("/add")
  .post(
    categoryValidation.createCategoryRules,
    catchValidationError(categoryController.createCategory)
  );

router
  .route("/update/:categoryId")
  .put(
    categoryValidation.updateCategoryRules,
    catchValidationError(categoryController.updateCategory)
  );

router
  .route("/delete/:categoryId")
  .delete(
    categoryValidation.deleteCategoryRules,
    catchValidationError(categoryController.deleteCategory)
  );

router
  .route("/all")
  .get(catchValidationError(categoryController.getCategories));

module.exports = router;
