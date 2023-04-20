const { Router } = require('express');
const paymentController = require('../controllers/payment');

const app = Router();

    app.get('/', paymentController.index);
    app.post('/update', paymentController.update);
    app.post('/store', paymentController.store);
    app.get('/delete', paymentController.deleteRow);
    app.get('/show', paymentController.show);

module.exports = app ;