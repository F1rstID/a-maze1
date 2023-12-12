'use strict';

const Sequelize = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // 전화번호를 문자열롶 설정한 이유는 국가 코드 등을 고려한것.
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      essential: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      marketing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
