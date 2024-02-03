const express = require('express');
const router = express.Router();

const customerController = require('./customer.controller')

router.post('/register',customerController.createUser);
router.post('/admin',customerController.adminLogin);
router.post('/login',customerController.jwtLogin)

module.exports = router;
