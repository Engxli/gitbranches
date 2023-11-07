const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./database");
const userRouter = require("./api/users/users.routes");
const tweetRouter = require("./api/tweets/tweets.routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const app = express();

require("dotenv").config();

// BEFORE ROUTES MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

// ROUTES
app.use("/api/users", userRouter);
app.use("/api/tweets", tweetRouter);
// AFTER ROUTES MIDDLEWARES
app.use(notFound);
app.use(errorHandler);
// CONNECT TO DB
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`APP IS RUNNING ON PORT: ${process.env.PORT}`);
});
// hi
// this is ali branch
// moodhi add this line
