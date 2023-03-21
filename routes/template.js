const { Router } = require('express');
const templateController = require('../controllers/template');
const { up_template } = require('../helper/upload');
const { opne_zip } = require('../helper/zip_extract.js');

const app = Router();

app.get('/', templateController.index);
app.post('/store', up_template,opne_zip, templateController.store);
app.post('/update', templateController.update);
app.get('/delete', templateController.deleteRow);
app.get('/show', templateController.show);

module.exports = app;
