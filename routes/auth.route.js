const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.cotroller.js');
const authController = new AuthController();

/**
 * @swagger
 * paths:
 *  /api/auth/login:
 *   post:
 *    tags:
 *    - api/auth
 *    description: SMS 발송 API
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        phoneNumber:
 *         type: string
 *         example: 01055857044
 *
 *    responses:
 *     200:
 *      description: 회원가입 or 로그인 성공
 *      schema:
 *       properties:
 *        sendMessageRes:
 *         properties:
 *          messageId:
 *           type: string
 *           example: M4V20231213022720CXA7QB6VW7XMS9R
 *     400:
 *      description: 핸드폰 번호 유효성 에러
 *      schema:
 *       properties:
 *        errorMessage:
 *         example: Joi Error.
 *     500:
 *      description: 서버 내부 에러
 *      schema:
 *       properties:
 *        errorMessage:
 *         example: 서부 내부 에러 Log
 *
 */
router.post('/login', authController.sendMessage);

/**
 * @swagger
 * paths:
 *  /api/auth/cert:
 *   post:
 *    tags:
 *    - api/auth
 *    description: SMS 인증 API
 *    parameters:
 *    - in: body
 *      name: body
 *      required: true
 *      schema:
 *       properties:
 *        messageId:
 *         type: string
 *         example: M4V20231213010152HNTB9S3TSPPM9MG
 *        certNum:
 *         type: string
 *         example: 768305
 *        essential:
 *         type: boolean
 *         example: true
 *         description: 필수 동의 사항.
 *        marketing:
 *         type: boolean
 *         example: false
 *
 *    responses:
 *     200:
 *      description: 회원가입 or 로그인 성공
 *      schema:
 *       properties:
 *        certMessageRes:
 *         properties:
 *          success:
 *           type: boolean
 *           example: true
 *     400:
 *      description: 필수사항 유효성 에러
 *      schema:
 *       properties:
 *        errorMessage:
 *         example: 필수사항에 동의 하지 않았습니다.
 *     500:
 *      description: 서버 내부 에러
 *      schema:
 *       properties:
 *        errorMessage:
 *         example: 서부 내부 에러 Log
 *
 */
router.post('/cert', authController.cert);

module.exports = router;
