const createError = require("http-errors");

module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  const validEmail = (userEmail) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  };

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      next(createError(400, "Missing Credentials"));
    } else if (!validEmail(email)) {
      next(createError(400, "Invalid Email"));
    } else if (password.length < 6) {
      next(createError(400, "Password should atleast have 6 characters"));
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      next(createError(400, "Missing Credentials"));
    } else if (!validEmail(email)) {
      next(createError(400, "Invalid Email"));
    }
  }

  next();
};
