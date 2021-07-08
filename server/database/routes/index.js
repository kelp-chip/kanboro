const { User, List, Board, Task } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  Users: {
    create: async (
      username,
      password,
      avatar_url = "https://image.flaticon.com/icons/png/512/1177/1177568.png"
    ) => {
      await bcrypt.hash(password, 12, (err, hashedPassword) => {
        User.create({
          username: username,
          password: hashedPassword,
          avatar_url: avatar_url,
        });
        console.log(hashedPassword);
      });
    },
    login: async (username, password, req, cb) => {
      const user = await User.findOne({ where: { username } });
      if (user) {
        const hashedPw = user.dataValues.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPw);
        if (passwordsMatch) {
          // req.session.user = user;
          id = user.id;
          const token = jwt.sign({ id }, "secret", {
            expiresIn: 300,
          });
          cb({ auth: true, token: token, result: user });
        } else {
          cb("wrong username or password");
        }
      } else {
        cb("wrong username or password");
      }
    },
  },
};
