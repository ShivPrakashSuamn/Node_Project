const { Router } = require('express');
const authController = require('../controllers/auth');
const { imageUpload } = require('../helper/upload');

const app = Router();

app.post('/login', authController.login);
app.post('/profile', authController.profile);
app.post('/register',imageUpload, authController.register);
app.post('/forgot', authController.forgotpassword);
app.post('/reset', authController.resetpassword);
app.get('/worklog', authController.worklog);

module.exports = app;