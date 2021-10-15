const router = require("express").Router();
const validInfo = require("../middleware/validInfo");

const { signup, login } = require("../controllers");

router.get("/", async (req, res) => {
  res.send("🚀 Server running 🚀");
});

router.post("/signup", validInfo, signup);

router.post("/login", validInfo, login);

module.exports = router;
