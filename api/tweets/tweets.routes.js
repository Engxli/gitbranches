const express = require("express");
const {
  getAllTweets,
  createTweet,
  deleteTweet,
  getMyTweets,
} = require("./tweets.controllers");
const passport = require("passport");

const router = express.Router();

router.get("/", getAllTweets);
router.post("/", passport.authenticate("jwt", { session: false }), createTweet);
router.delete(
  "/:tweetId",
  passport.authenticate("jwt", { session: false }),
  deleteTweet
);

router.get(
  "/my-tweets",
  passport.authenticate("jwt", { session: false }),
  getMyTweets
);
module.exports = router;
