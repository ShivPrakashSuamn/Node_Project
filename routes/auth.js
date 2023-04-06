const { Router } = require('express');
const authController = require('../controllers/auth');
const app = Router();

app.post('/login', authController.login);
app.post('/profile', authController.profile);
app.post('/register', authController.register);
app.get('/forgot', authController.forgotpassword);
app.get('/reset', authController.resetpassword);

module.exports = app;