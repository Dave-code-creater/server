const express = require('express');
const router = express.Router();
const {login, logout, register, verify, refreshToken} = require('../Services/AuthService');

router.post('/register', register);
router.post('/login', login);
router.delete('/logout', logout);
router.post('/verify', verify);
router.post('/refresh-token', refreshToken);
router.get('/', (req, res) => {
    res.send('Hello World from auth service');
});

module.exports = router;