"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     * to run seed:
     * npx sequelize-cli db:seed:all
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "pnzu",
          password: "cats",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    //Add commands to revert seed here.
    //---------undoing seeds-------------
    //most recent:
    //npx sequelize-cli db:seed:undo
    //specific:
    //npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
    //undo all:
    //npx sequelize-cli db:seed:undo:all
    await queryInterface.bulkDelete("Users", null, {});
  },
};
