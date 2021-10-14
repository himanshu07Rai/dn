const jwt = require("jsonwebtoken");
const createError = require("http-errors");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.header("auth-token");

    if (!token) {
      next(createError(403, "No token, authorisation denied"));
    }

    const payload = jwt.verify(token, process.env.jwtSecret);

    req.user = payload.user.id;
    next();
  } catch (error) {
    next(createError(401, "Token is not valid !"));
  }
};
