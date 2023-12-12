const express = require('express');
const router = express.Router();

const authRouter = require('./auth.route');
const logRouter = require('./log.route');

//* /api/ ~ Routing
router.use('/auth', authRouter);
router.use('/log', logRouter);

module.exports = router;
