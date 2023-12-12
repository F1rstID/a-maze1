// require('express-async-errors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User, Log } = require('../models');
const LogRepository = require('../repositories/log.repository');
class LogService {
  constructor() {
    this.logRepository = new LogRepository(User, Log);
  }

  //* 로그인된 사용자의 Log를 찾음
  findMyLogs = async (payload) => {
    const myLogs = await this.logRepository.findMyLogs(payload.userId);
    return myLogs;
  };

  //* 모든 Log 를 찾음
  findAllLogs = async () => {
    const allLogs = await this.logRepository.findAllLogs();
    return allLogs;
  };

  //* 핸드폰 번호를 이용하여 Log 검색
  searchLogs = async (payload) => {
    const searchLogs = await this.logRepository.searchLogs(payload.phoneNumber);
    return searchLogs;
  };
}

module.exports = LogService;
