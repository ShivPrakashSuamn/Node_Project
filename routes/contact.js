const { Router } = require('express');
const contactController = require('../controllers/contact');
const { imageUpload, fileUpload } = require('../helper/upload');

const app = Router();

app.get('/', contactController.index);
app.post('/store', imageUpload, contactController.store);
app.post('/csv', fileUpload, contactController.CSVstore);
app.post('/update', imageUpload, contactController.update);
app.get('/delete', contactController.deleteRow);
app.get('/show', contactController.show);

module.exports = app; 
