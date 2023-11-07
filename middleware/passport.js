const User = require("../models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

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

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_PRIVATE_KEY,
  },
  async (payload, done) => {
    try {
      if (Date.now() / 1000 > payload.exp) {
        // token is exp
        done({ message: "Token is exp" });
      }

      const user = await User.findById(payload._id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
