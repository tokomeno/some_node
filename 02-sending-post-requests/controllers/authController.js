const User = require("../models/user");
const { validationResult } = require("express-validator/check");

const bycrpt = require("bcryptjs");

exports.singUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validaiton failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.email;
  const password = req.body.password;
  bycrpt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        email,
        name,
        password: hashedPw
      });
      return user.save();
    })
    .then(result => {
      res
        .status(201)
        .json({ message: "User", user: result, userId: result._id });
    })
    .catch(err => next(err));
};
