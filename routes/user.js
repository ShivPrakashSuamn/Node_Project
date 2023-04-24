const { Router } = require('express');
const userController = require('../controllers/user');
const { imageUpload, fileUpload } = require('../helper/upload');
const app = Router();

    app.get('/', userController.index);
    app.post('/store',imageUpload, userController.store);
    app.post('/update',imageUpload, userController.update);
    app.get('/delete', userController.deleteRow);
    app.get('/show', userController.show);

module.exports = app ;