const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.showRegisterForm);
router.post('/register', userController.register);
router.get('/login', userController.showLoginForm);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/profile', userController.showProfile);
router.post('/profile', userController.updateProfile);

module.exports = router;
