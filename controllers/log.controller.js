const Joi = require('joi');
const LogService = require('../services/log.service.js');
const { BadRequestError } = require('../helper/http.exception.helper');

class LogController {
  constructor() {
    this.logService = new LogService();
  }

  findMyLogs = async (req, res) => {
    const payload = { userId: res.locals.decodedAccessToken.userId };
    const myLogRes = await this.logService.findMyLogs(payload);
    res.status(200).json({ myLogRes });
  };
  findAllLogs = async (req, res) => {
    const allLogRes = await this.logService.findAllLogs();
    res.status(200).json({ allLogRes });
  };
  searchLogs = async (req, res) => {
    const schema = Joi.object({ phoneNumber: Joi.string().max(20).required() });
    const payload = schema.validate({ phoneNumber: req.query.phoneNumber });
    if (payload.error) throw new BadRequestError(payload.error);
    const searchLogRes = await this.logService.searchLogs(payload.value);
    res.status(200).json({ searchLogRes });
  };
}

module.exports = LogController;
