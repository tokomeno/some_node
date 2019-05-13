const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/authController");
// const

router.put(
  "/singup",
  [
    body("email")
      .isEmail()
      .withMessage("enter valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("email alread exists 111111");
          }
        });
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("name")
      .trim()
      .not()
      .isEmpty()
  ],
  authController.singUp
);

router.post("/login", authController.login);

module.exports = router;
