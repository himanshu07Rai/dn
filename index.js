const express = require("express");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", require("./routes"));
app.use("/todos", require("./routes/todos"));

app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT} 🚀`);
});
