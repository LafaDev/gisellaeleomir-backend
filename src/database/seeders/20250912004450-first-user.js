'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert('user', [{
      id: 1,
      email: 'leomirrenne10@gmail.com',
      password: hashedPassword,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', { email: 'admin@example.com' }, {});
  }
};
