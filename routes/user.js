const { Router } = require('express');
const userController = require('../controllers/user');

const app = Router();

    app.get('/', userController.index);
    app.post('/add', userController.store);
    app.get('/delete', userController.deleteRow);
    app.get('/show', userController.show);
    app.post('/update', userController.update);

module.exports = app ;