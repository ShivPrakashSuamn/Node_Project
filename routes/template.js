const { Router } = require('express');
const templateController = require('../controllers/template');
const {upload,up_template} = require('../helper/upload');

const app = Router();

    app.get('/', templateController.index);
    app.post('/store', upload,templateController.store);
    app.post('/update', templateController.update);
    app.get('/delete', templateController.deleteRow);
    app.get('/show', templateController.show);

module.exports = app;
