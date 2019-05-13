const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "secret");
  } catch (err) {
    throw err;
  }
  if (!decodedToken) {
    throw new Error("Not authicakldfjsl");
  }
  req.userId = decodedToken.userId;
  next();
};
