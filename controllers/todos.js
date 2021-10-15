const prisma = require("../prisma/client");
const createError = require("http-errors");

const getAllTodos = async (req, res, next) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        user_id: req.user,
      },
      select: {
        user_email: true,
        user_name: true,
        Todo: true,
      },
    });
    res.json(data);
  } catch (error) {
    next(createError(500, error.message));
  }
};

const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));
    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else res.json(t);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (description.length === 0)
      next(createError(401, "Description can't be empty!"));
    else {
      const newTodo = await prisma.todo.create({
        data: {
          description,
          user_id: req.user,
        },
      });
      res.json(newTodo);
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));
    const { description } = req.body;
    if (!description || description.length === 0)
      next(createError(401, "Description can't be empty!"));

    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else {
      const td = await prisma.todo.update({
        where: {
          todo_id: Number(id),
        },
        data: {
          description,
        },
      });
      res.json(td);
    }
  } catch (error) {
    next(createError(500, error.message));
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    var numbers = /^[0-9]+$/;
    if (!id.match(numbers)) next(createError(400, "Not a valid id!"));

    const t = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });
    if (!t) next(createError("No such todo!"));
    else if (t.user_id !== req.user)
      next(createError(400, "This todo is not yours"));
    else {
      const deletedTodo = await prisma.todo.delete({
        where: {
          todo_id: Number(id),
        },
      });
      res.json(deletedTodo);
    }

    if (deletedTodo.rowCount === 0) {
      next(createError(401, "This isn't your todo"));
    } else res.json(deletedTodo.rows);
  } catch (error) {
    next(createError(500, "Server Error"));
  }
};

module.exports = { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo };
