const { Router } = require('express');
const listController = require('../controllers/list');
const { imageUpload, fileUpload } = require('../helper/upload');

const app = Router();

app.get('/', listController.index);
app.post('/store', listController.store);
app.post('/csv', listController.CSVstore);
app.post('/update', listController.update);
app.get('/delete', listController.deleteRow);
app.get('/show', listController.show);

module.exports = app; 