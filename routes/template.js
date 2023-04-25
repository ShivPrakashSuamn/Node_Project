const { Router } = require('express');
const templateController = require('../controllers/template');
const { fileUpload } = require('../helper/upload');

const app = Router();

app.get('/', templateController.index);
app.post('/store', fileUpload, templateController.store);
app.post('/update',fileUpload, templateController.update);
app.get('/delete', templateController.deleteRow);
app.get('/show', templateController.show);
app.get('/category', templateController.category);

module.exports = app;
