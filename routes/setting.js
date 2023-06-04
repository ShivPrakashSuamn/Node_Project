const { Router } = require('express');
const settingController = require('../controllers/setting');
const { fileUpload, imageUpload } = require('../helper/upload');

const app = Router();

app.get('/', settingController.index);
app.get('/constant/:key', settingController.getSetting);
app.post('/store',imageUpload, settingController.store);
app.post('/update',imageUpload, settingController.update);
app.get('/delete', settingController.deleteRow);
app.get('/show', settingController.show);

app.get('/userindex', settingController.userIndex);
app.post('/userstore',imageUpload, settingController.userStore);
app.post('/userupdate',imageUpload, settingController.userUpdate);
app.get('/userdelete', settingController.userDeleteRow);
app.get('/usershow', settingController.userShow);

module.exports = app;