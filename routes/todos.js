const router = require("express").Router();
const authorisation = require("../middleware/authorisation");

const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");

router.get("/", authorisation, getAllTodos);

router.get("/:id", authorisation, getTodo);

router.post("/", authorisation, createTodo);

router.put("/:id", authorisation, updateTodo);

router.delete("/:id", authorisation, deleteTodo);

module.exports = router;
