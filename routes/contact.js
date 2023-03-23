const { Router } = require('express');
const contactController = require('../controllers/contact');
const { upload, up_template, up_csv } = require('../helper/upload');

const app = Router();

app.get('/', contactController.index);
app.post('/store', up_csv, contactController.store);
app.post('/update', upload, contactController.update);
app.get('/delete', contactController.deleteRow);
app.get('/show', contactController.show);

module.exports = app; 
