const { Router } = require('express');
    const authController = require('../controllers/auth');
const app = Router();
  
    app.get('/login', authController.login);
    app.post('/register', authController.register);
    app.get('/forgot', authController.forgotpassword);
    app.get('/reset', authController.resetpassword);
  
module.exports = app;