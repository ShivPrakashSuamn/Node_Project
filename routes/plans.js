const { Router } = require('express');
const plansController = require('../controllers/plans');

const app = Router();

    app.get('/', plansController.index);
    app.post('/store', plansController.store);
    app.post('/storefeatures', plansController.storeFeatures);
    app.get('/delete', plansController.deleteRow);
    app.get('/show', plansController.show);
    app.post('/update', plansController.update);

module.exports = app ;