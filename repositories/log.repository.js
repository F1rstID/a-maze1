// * 비동기 에러처리를 위한 패키지 require
// require('express-async-errors');
// const { InternalServerError } = require('../helper/http.exception.helper.js');
class LogRepository {
  constructor(UserModel, LogModel) {
    this.userModel = UserModel;
    this.logModel = LogModel;
  }

  //* 로그인된 사용자의 Log를 찾음
  findMyLogs = async (userId) => {
    const myLogs = await this.logModel.findAll({
      where: { userId },
      include: [
        {
          model: this.userModel,
          where: { id: userId },
          attributes: ['phone'],
        },
      ],
    });

    const result = myLogs.map((v) => {
      return {
        phoneNumber: v.User.phone,
        loggedAt: v.logged_at,
      };
    });
    return result;
  };

  //* 모든 Log 를 찾음

  findAllLogs = async () => {
    const allLogs = await this.logModel.findAll({
      include: [
        {
          model: this.userModel,
        },
      ],
    });

    const result = allLogs.map((v) => {
      return {
        phoneNumber: v.User.phone,
        loggedAt: v.logged_at,
      };
    });
    return result;
  };

  //* 핸드폰 번호를 이용하여 Log 검색
  searchLogs = async (phoneNumber) => {
    const searchUser = await this.userModel.findOne({
      where: { phone: phoneNumber },
    });
    const searchLogs = await this.logModel.findAll({
      where: { userId: searchUser.id },
      include: [
        {
          model: this.userModel,
          where: { phone: phoneNumber },
          attributes: ['phone'],
        },
      ],
    });

    const result = searchLogs.map((v) => {
      return {
        phoneNumber: v.User.phone,
        loggedAt: v.logged_at,
      };
    });

    return result;
  };
}

module.exports = LogRepository;
