'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Log, {
        sourceKey: 'id',
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      essential: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      marketing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      //* static init 메서드의 매개변수와 연결되는 옵션 db.sequelize 객체를 넣어야함
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    }
  );
  return User;
};
