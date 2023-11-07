const { Schema, model } = require("mongoose");

const TweetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  text: String,
});

module.exports = model("Tweet", TweetSchema);
