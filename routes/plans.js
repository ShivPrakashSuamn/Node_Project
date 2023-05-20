const { Router } = require('express');
const plansController = require('../controllers/plans');

const app = Router();

    app.get('/', plansController.index);
    app.post('/store', plansController.store);
    app.get('/delete', plansController.deleteRow);
    app.get('/show', plansController.show);
    app.post('/update', plansController.update);
    app.get('/subscription', plansController.subscription);

module.exports = app ;