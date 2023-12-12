require('express-async-errors');
const Joi = require('joi');

const AuthService = require('../services/auth.service.js');
const { BadRequestError } = require('../helper/http.exception.helper.js');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  //* SMS 발송
  sendMessage = async (req, res) => {
    //* Client 에서 발송한 데이터 유효성 검증
    const schema = Joi.object({
      phoneNumber: Joi.string().min(1).max(20).required(),
    });
    const payload = schema.validate(req.body);
    //* 유효성 에러시 400번 에러
    if (payload.error) throw new BadRequestError(payload.error);

    const sendMessageRes = await this.authService.sendMessage(payload.value);
    res.status(200).json({ sendMessageRes });
  };

  cert = async (req, res) => {
    //* Client 에서 발송한 string type 데이터를 boolean type으로 변경
    const transData = {
      essential: req.body.essential === 'true',
      marketing: req.body.marketing === 'true',
      messageId: req.body.messageId,
      certNum: req.body.certNum,
    };
    //* 필수약관 미동의시 400번 에러
    if (transData.essential === false)
      throw new BadRequestError('필수사항에 동의 하지 않았습니다.');

    //* Client 에서 발송한 데이터 유효성 검증
    const schema = Joi.object({
      messageId: Joi.string().required(),
      certNum: Joi.string().length(6).required(),
      essential: Joi.boolean().equal(true).required(),
      marketing: Joi.boolean().required(),
    });
    const payload = schema.validate(req.body);

    //* 유효성 에러시 400번 에러
    if (payload.error) throw new BadRequestError(payload.error);

    const certMessageRes = await this.authService.certMessage(payload.value);
    //* Login 또는 Signup 성공시
    if (certMessageRes) {
      //* JWT 토큰을 Cookie에 담음
      res.cookie('Authorization', `Bearer ${certMessageRes.accessToken}`);

      //* Client에 필요치 않은 데이터 삭제
      delete certMessageRes.accessToken;
      res.status(200).json({ certMessageRes });
    }
  };
}

module.exports = AuthController;
