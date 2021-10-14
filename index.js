const express = require("express");
const cors = require("cors");
const createError = require("http-errors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("🚀 Server running 🚀");
});

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
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

const PORT = process.env.PORT || 5000;

console.log(process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`🚀 Running on port ${PORT} 🚀`);
});
