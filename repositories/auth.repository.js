// * 비동기 에러처리를 위한 패키지 require
require('express-async-errors');
const { InternalServerError } = require('../helper/http.exception.helper.js');
class AuthRepository {
  constructor(UserModel, LogModel) {
    this.userModel = UserModel;
    this.logModel = LogModel;
  }

  findUser = async (phoneNumber) => {
    const user = await this.userModel.findOne({
      where: { phone: phoneNumber },
    });
    return user;
  };
  signUp = async (payload) => {
    try {
      const result = await this.userModel.create({
        phone: payload.phoneNumber,
        ...payload,
      });

      return result;
    } catch (err) {
      console.log(err);
      throw new InternalServerError(err);
    }
  };

  createLog = async (userId) => {
    const now = new Date();
    const koreaTime = now.setHours(now.getHours() + 9);
    const createdLog = await this.logModel.create({
      userId,
      logged_at: new Date(koreaTime),
    });
    return createdLog;
  };
}

module.exports = AuthRepository;
