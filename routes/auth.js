const { Router } = require('express');
const authController = require('../controllers/auth');
const { imageUpload } = require('../helper/upload');

const app = Router();

app.post('/login', authController.login);
app.post('/profile', authController.profile);
app.post('/register',imageUpload, authController.register);
app.get('/forgot', authController.forgotpassword);
app.get('/reset', authController.resetpassword);
app.get('/worklog', authController.worklog);
app.post('/worklogStore', authController.worklogStore);

module.exports = app;