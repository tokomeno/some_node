const User = require("../models/user");
const { validationResult } = require("express-validator/check");

const bycrpt = require("bcryptjs");

const jwt = require("jsonwebtoken");

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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        throw new Error("A user with mail not found");
      }
      loadedUser = user;
      return bycrpt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        throw new Error("Wroing Pass");
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        "secret",
        { expiresIn: "1h" }
      );
      res.json({ token, userId: loadedUser._id.toString() });
    })
    .catch(err => next(err));
};
