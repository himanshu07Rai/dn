const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const authorisation = require("../middleware/authorisation");
const prisma = require("../prisma/client");

router.get("/", authorisation, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: req.user,
      },
      select: {
        user_name: true,
      },
    });
    res.json(user);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
});

module.exports = router;
