const Tweet = require("../../models/Tweet");
const User = require("../../models/User");

exports.getAllTweets = async (req, res, next) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error) {
    next(error);
  }
};

exports.createTweet = async (req, res, next) => {
  try {
    console.log(req.bashayer);
    req.body.user = req.user._id;
    const tweet = await Tweet.create(req.body);
    await req.user.updateOne({ $push: { tweets: tweet } });

    res.status(201).json(tweet);
  } catch (error) {
    next(error);
  }
};

exports.deleteTweet = async (req, res, next) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) return next({ message: "tweet is not found" });

    if (tweet.user.equals(req.user._id)) {
      // i can delete this tweet
      await tweet.deleteOne();
      return res.status(204).end();
    } else {
      // the user does not have permission to delete
      next({ message: "You don't have permission to delete this tweet" });
    }
  } catch (error) {
    next(error);
  }
};

exports.getMyTweets = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};
