const { Router } = require('express');
const compaignController = require('../controllers/compaign');
const { imageUpload, fileUpload } = require('../helper/upload');

const app = Router();

app.get('/', compaignController.index);
app.post('/store', compaignController.store);
app.post('/update', compaignController.update);
app.get('/delete', compaignController.deleteRow);
app.get('/show', compaignController.show);

module.exports = app; 
