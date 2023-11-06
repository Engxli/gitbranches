const express = require("express");
const { getAllUsers, signup, signin } = require("./users.controllers");
const passport = require("passport");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
