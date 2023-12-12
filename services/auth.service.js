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

  sendMessage = async (payload) => {
    const sendMessageData = await sendMessage(payload.phoneNumber);
    const sendMessageRes = { messageId: sendMessageData.messageId };
    return sendMessageRes;
  };

  certMessage = async (payload) => {
    const result = await receiveMessage(payload.messageId);
    const messageText = result.data.messageList[payload.messageId].text;
    const phoneNumber = result.data.messageList[payload.messageId].to;
    const messageCertNum = messageText.match(/[0-9]{6}/);

    if (payload.certNum !== messageCertNum[0]) {
      throw new BadRequestError('인증번호가 올바르지 않습니다.');
    }

    const userDto = await this.authRepository.findUser(phoneNumber);

    if (!userDto) throw new BadRequestError('존재하지 않는 회원입니다.');

    const accessToken = jwt.sign(
      { userId: userDto.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    await this.authRepository.createLog(userDto.id);

    return { success: true, accessToken };
  };

  signup = async (payload) => {
    const createdUser = await this.authRepository.signUp(payload);

    const accessToken = jwt.sign(
      { userId: createdUser.dataValues.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    );

    await this.authRepository.createLog(createdUser.dataValues.id);

    return { success: true, accessToken };
  };
}

module.exports = AuthService;
