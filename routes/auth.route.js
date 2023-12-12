const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.cotroller.js');
const authController = new AuthController();

router.post('/login', authController.sendMessage);
router.post('/cert', authController.cert);
router.post('/signup', authController.signup);

module.exports = router;
