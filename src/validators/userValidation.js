const { check } = require("express-validator");

const registrationRules = [
  check("name").trim().notEmpty().withMessage("name is required"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password length must be greater than 6"),
];

const loginRules = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Invalid e-mail address"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is Required")
    .isLength({ min: 6 })
    .withMessage("Password Length must be 6 "),
];

const forgotPasswordRules = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email address is required")
    .isEmail()
    .withMessage("Invalid e-mail address"),
];

const userValidation = {
  registrationRules,
  loginRules,
  forgotPasswordRules,
};

module.exports = userValidation;
