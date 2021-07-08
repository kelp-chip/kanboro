const { User, List, Board, Task } = require("../models");
const bcrypt = require("bcrypt");

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
    login: async (username, password) => {
      const user = await User.findOne({ where: { username } });
      if (user) {
        const hashedPw = user.dataValues.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPw);
        if (passwordsMatch) {
          console.log("You logged in!");
        } else {
          console.log("wrong username or password");
        }
      } else {
        console.log("wrong username or password");
      }
    },
  },
};
