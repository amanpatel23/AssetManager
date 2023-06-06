const express = require('express');
const router = express.Router();

const usersApi = require('../../controllers/api/users_api');

router.post('/signup', usersApi.signup);
router.post('/signin', usersApi.signin);

module.exports = router;