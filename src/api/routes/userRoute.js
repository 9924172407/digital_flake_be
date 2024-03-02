const express = require("express");
const userController = require("../../controllers/userController");
const catchValidationError = require("../../utils/catchValidationError");
const userValidation = require("../../validators/userValidation");
const router = express.Router();
router
  .route("/signup")
  .post(
    userValidation.registrationRules,
    catchValidationError(userController.register)
  );
router
  .route("/login")
  .post(userValidation.loginRules, catchValidationError(userController.login));
router
  .route("/forgot-password")
  .post(
    userValidation.forgotPasswordRules,
    catchValidationError(userController.sendForgotPasswordToken)
  );
router.route("/logOut").post(catchValidationError(userController.logOutUser));

module.exports = router;
