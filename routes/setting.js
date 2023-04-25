const { Router } = require('express');
const settingController = require('../controllers/setting');
const { fileUpload } = require('../helper/upload');

const app = Router();

app.get('/setting/:key', settingController.getSetting);

module.exports = app;