const { Router } = require('express');
const settingController = require('../controllers/setting');

const app = Router();

app.get('/:key', settingController.getSetting);

module.exports = app;