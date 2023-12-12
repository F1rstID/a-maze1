const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const logRouter = require('./log.route');

router.use('/auth', authRouter);
router.use('/log', logRouter);

module.exports = router;
