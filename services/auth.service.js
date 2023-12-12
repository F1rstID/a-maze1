// require('express-async-errors');
require('dotenv').config();
const {
  BadRequestError,
  NotFound,
} = require('../helper/http.exception.helper.js');
const jwt = require('jsonwebtoken');
const AuthRepository = require('../repositories/auth.repository.js');
const sendMessage = require('../helper/send.message.helper.js');
const receiveMessage = require('../helper/receive.message.helper.js');
const { User, Log } = require('../models');
class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(User, Log);
  }

  //* SMS 발송
  sendMessage = async (payload) => {
    const sendMessageData = await sendMessage(payload.phoneNumber);
    const sendMessageRes = { messageId: sendMessageData.messageId };
    return sendMessageRes;
  };

  //* SMS 인증번호 검증 및 로그인 or 회원가입
  certMessage = async (payload) => {
    const result = await receiveMessage(payload.messageId);
    const messageText = result.data.messageList[payload.messageId].text;
    const phoneNumber = result.data.messageList[payload.messageId].to;

    //* 정규식을 이용하여 연속된 길이가 6인 숫자 파싱
    const messageCertNum = messageText.match(/[0-9]{6}/);

    //* 사용자가 입력한 인증번호와 파싱된 인증번호가 일치하지 않을경우 400번 에러
    if (payload.certNum !== messageCertNum[0]) {
      throw new BadRequestError('인증번호가 올바르지 않습니다.');
    }

    //* 사용자의 핸드폰 번호를 db에서 검색
    const userDto = await this.authRepository.findUser(phoneNumber);

    //* 해당 유저 약관 변경.
    userDto.essential = payload.essential;
    userDto.marketing = payload.marketing;

    await this.authRepository.updateTerms(userDto);

    //* 사용자의 핸드폰 번호로 가입되어있지 않을경우
    if (!userDto) {
      payload.phoneNumber = phoneNumber;
      //* 회원가입
      await this.authRepository.signUp(payload);
    }

    //* AccessToken 생성
    const accessToken = jwt.sign(
      { userId: userDto.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    //* 인증번호 검증 및 로그인 or 회원가입 성공하여 Logging
    await this.authRepository.createLog(userDto.id);

    return { success: true, accessToken };
  };
}

module.exports = AuthService;
