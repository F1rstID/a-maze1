require('express-async-errors');
const Joi = require('joi');

const AuthService = require('../services/auth.service.js');
const { BadRequestError } = require('../helper/http.exception.helper.js');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  sendMessage = async (req, res) => {
    const schema = Joi.object({
      phoneNumber: Joi.string().min(1).max(20).required(),
    });
    const payload = schema.validate(req.body);
    if (payload.error) throw new BadRequestError(payload.error);

    const sendMessageRes = await this.authService.sendMessage(payload.value);
    res.status(200).json({ sendMessageRes });
  };

  cert = async (req, res) => {
    const schema = Joi.object({
      messageId: Joi.string().required(),
      certNum: Joi.string().length(6).required(),
    });
    const payload = schema.validate(req.body);
    if (payload.error) throw new BadRequestError(payload.error);

    const certMessageRes = await this.authService.certMessage(payload.value);
    if (certMessageRes) {
      res.cookie('Authorization', `Bearer ${certMessageRes.accessToken}`);
      delete certMessageRes.accessToken;
      res.status(200).json({ certMessageRes });
    }
  };

  signup = async (req, res) => {
    const transData = {
      phoneNumber: req.body.phoneNumber,
      essential: req.body.essential === 'true',
      marketing: req.body.marketing === 'true',
    };

    if (transData.essential === false)
      throw new BadRequestError('필수사항에 동의 하지 않았습니다..');

    const schema = Joi.object({
      phoneNumber: Joi.string().min(1).max(20).required(),
      essential: Joi.boolean().equal(true).required(),
      marketing: Joi.boolean().required(),
    });

    const payload = schema.validate(transData);

    if (payload.error) throw new BadRequestError(payload.error);

    const signupRes = await this.authService.signup(payload.value);
    res.cookie('Authorization', `Bearer ${signupRes.accessToken}`);
    delete signupRes.accessToken;
    res.status(200).json({ ...signupRes });
  };
}

module.exports = AuthController;
