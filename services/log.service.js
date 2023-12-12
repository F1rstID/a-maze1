// require('express-async-errors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Log } = require('../models');
const LogRepository = require('../repositories/log.repository');
class LogService {
  constructor() {
    this.logRepository = new LogRepository(User, Log);
  }

  findMyLogs = async (payload) => {
    const myLogs = await this.logRepository.findMyLogs(payload.userId);
    return myLogs;
  };

  findAllLogs = async () => {
    const allLogs = await this.logRepository.findAllLogs();
    return allLogs;
  };

  searchLogs = async (payload) => {
    const searchLogs = await this.logRepository.searchLogs(payload.phoneNumber);
    return searchLogs;
  };
}

module.exports = LogService;
