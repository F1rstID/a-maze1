const express = require('express');
const router = express.Router();

const tokenValidateMiddleWare = require('../middlewares/token.validate.middleware');

const LogController = require('../controllers/log.controller');
const logController = new LogController();

router.get('/me', tokenValidateMiddleWare, logController.findMyLogs);
router.get('/all', tokenValidateMiddleWare, logController.findAllLogs);
router.get('/search', tokenValidateMiddleWare, logController.searchLogs);

module.exports = router;
