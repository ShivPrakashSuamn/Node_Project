const { Router } = require('express');
const orderController = require('../controllers/order');

const app = Router();

    app.post('/', orderController.index);

module.exports = app ;