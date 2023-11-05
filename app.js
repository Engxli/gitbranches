const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./database");
const app = express();
require("dotenv").config();

// BEFORE ROUTES MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// ROUTES

// AFTER ROUTES MIDDLEWARES
app.use(notFound);
app.use(errorHandler);
// CONNECT TO DB
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${process.env.PORT}`);
});
