const Joi = require('joi');
const LogService = require('../services/log.service.js');
const { BadRequestError } = require('../helper/http.exception.helper');

class LogController {
  constructor() {
    this.logService = new LogService();
  }

  //* 로그인된 사용자의 Log를 찾음
  findMyLogs = async (req, res) => {
    const payload = { userId: res.locals.decodedAccessToken.userId };
    const myLogRes = await this.logService.findMyLogs(payload);
    res.status(200).json({ myLogRes });
  };

  //* 모든 Log 를 찾음
  findAllLogs = async (req, res) => {
    const allLogRes = await this.logService.findAllLogs();
    res.status(200).json({ allLogRes });
  };

  //* 핸드폰 번호를 이용하여 Log 검색
  searchLogs = async (req, res) => {
    const schema = Joi.object({ phoneNumber: Joi.string().max(20).required() });
    const payload = schema.validate({ phoneNumber: req.query.phoneNumber });
    if (payload.error) throw new BadRequestError(payload.error);
    const searchLogRes = await this.logService.searchLogs(payload.value);
    res.status(200).json({ searchLogRes });
  };
}

module.exports = LogController;
