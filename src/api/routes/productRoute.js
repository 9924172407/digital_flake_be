const express = require("express");
const productController = require("../../controllers/productController");
const catchValidationError = require("../../utils/catchValidationError");
const productValidation = require("../../validators/ProductValidation");
const upload = require("../../middlewares/upload");
const authenticateUser = require("../../middlewares/auth");
const router = express.Router();

router.use(authenticateUser);

router
  .route("/add")
  .post(
    upload.single("productImage"),
    productValidation.createProductRules,
    productValidation.validateProductImage,
    catchValidationError(productController.createProduct)
  );

router
  .route("/update/:productId")
  .put(
    productValidation.updateProductRules,
    catchValidationError(productController.updateProduct)
  );

router
  .route("/delete/:productId")
  .delete(
    productValidation.deleteProductRules,
    catchValidationError(productController.deleteProduct)
  );
router.route("/").get(catchValidationError(productController.getProducts));
router
  .route("/:productId")
  .get(catchValidationError(productController.getProductById));
module.exports = router;
