// * 비동기 에러처리를 위한 패키지 require
// require('express-async-errors');
const { InternalServerError } = require('../helper/http.exception.helper.js');
class AuthRepository {
  constructor(UserModel, LogModel) {
    this.userModel = UserModel;
    this.logModel = LogModel;
  }

  //* 핸드폰 번호를 이용하여 DB 검색
  findUser = async (phoneNumber) => {
    const userDto = await this.userModel.findOne({
      where: { phone: phoneNumber },
    });

    return userDto;
  };

  //* 핸드폰 번호, 약관 동의 사항들을 이용하여 회원가입.
  signUp = async (payload) => {
    console.log(payload);
    try {
      const result = await this.userModel.create({
        phone: payload.phoneNumber,
        ...payload,
      });

      return result;
    } catch (err) {
      //* 에러 발생시 500번 에러를 던짐.
      console.log(err);
      throw new InternalServerError(err);
    }
  };

  //* 로그인시 약관 동의사항 변경
  updateTerms = async (userDto) => {
    try {
      const updatedUserDto = await this.userModel.update(
        {
          essential: userDto.dataValues.essential,
          marketing: userDto.dataValues.marketing,
        },
        { where: { id: userDto.dataValues.id } }
      );
      return updatedUserDto;
    } catch (err) {
      //* 에러 발생시 500번 에러를 던짐.
      console.log(err);
      throw new InternalServerError(err);
    }
  };

  //* 로그인 or 회원가입시 Logging.
  createLog = async (userId) => {
    const now = new Date();
    //* UTC에 9시간을 더하여 한국시간으로 변경하여 DB 저장.
    const koreaTime = now.setHours(now.getHours() + 9);
    const createdLog = await this.logModel.create({
      userId,
      logged_at: new Date(koreaTime),
    });
    return createdLog;
  };
}

module.exports = AuthRepository;
