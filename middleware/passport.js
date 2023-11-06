const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) return done({ message: "Username or password is wrong!" });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return done({ message: "Username or password is wrong!" });

    return done(null, user);
  }
);

module.exports = localStrategy;
