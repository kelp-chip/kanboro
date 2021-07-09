const { User, List, Board, Task } = require("./database/models");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return done(null, false);
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id } });
    const userInformation = {
      username: user.username,
    };
    done(null, userInformation);
  });
};
