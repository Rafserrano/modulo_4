'use strict';

const express = require('express');

const router = express.Router();

const createAccount = require('../controllers/create-account-controller')
const loginAccount = require('../controllers/login-controller')

router.post('/account', createAccount);
router.post('/login', loginAccount);

module.exports = router;
