const express = require('express');
const router = express.Router();

const tokenValidateMiddleWare = require('../middlewares/token.validate.middleware');

const LogController = require('../controllers/log.controller');
const logController = new LogController();

/**
 * @swagger
 * /api/log/me:
 *   get:
 *     tags:
 *       - api/log
 *     summary: 내 로그 조회 API
 *     description: 현재 로그인한 사용자의 로그를 조회합니다.
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: 로그 조회 성공
 *       401:
 *         description: 인증되지 않음
 *       500:
 *         description: 서버 오류
 */
router.get('/me', tokenValidateMiddleWare, logController.findMyLogs);

/**
 * @swagger
 * /api/log/all:
 *   get:
 *     tags:
 *       - api/log
 *     summary: 전체 로그 조회 API
 *     description: 모든 사용자의 로그를 조회합니다.
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: 로그 조회 성공
 *       401:
 *         description: 인증되지 않음
 *       500:
 *         description: 서버 오류
 */
router.get('/all', tokenValidateMiddleWare, logController.findAllLogs);
/**
 * @swagger
 * /api/log/search:
 *   get:
 *     tags:
 *       - api/log
 *     summary: 로그 검색 API
 *     description: 전화번호를 기반으로 로그를 검색합니다.
 *     security:
 *     - jwt: []
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: 검색할 전화번호
 *         example: '01055857044'
 *     responses:
 *       200:
 *         description: 로그 검색 성공
 *       400:
 *         description: 잘못된 요청 또는 필수 매개변수 누락
 *       500:
 *         description: 서버 오류
 */
router.get('/search', tokenValidateMiddleWare, logController.searchLogs);

module.exports = router;
