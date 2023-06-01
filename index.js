
var cors = require('cors');
const jwt = require('./helper/jwt');
const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const authRouter = require('./routes/auth');
const listRouter = require('./routes/list');
const contactRouter = require('./routes/contact');
const dashboardRouter = require('./routes/dashboard');
const templateRouter = require('./routes/template');
const userRouter = require('./routes/user');
const plansRouter = require('./routes/plans');
const paymentRouter = require('./routes/payment');
const settingRouter = require('./routes/setting');
const compaignRouter = require('./routes/compaign');

var app = express();
app.use(jwt);
const homePath = path.join(__dirname, 'controllers');
var corsOptions = {
    "origin": "*http://localhost:4200",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(corsOptions))

// const homePath = path.join(__dirname, 'controllers');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())
app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use('/contact', contactRouter);
app.use('/dashboard', dashboardRouter);
app.use('/template', templateRouter);
app.use('/user', userRouter);
app.use('/plans', plansRouter);
app.use('/payment', paymentRouter);
app.use('/setting', settingRouter);
app.use('/compaign', compaignRouter);

app.get('/uploads/images/:images', (req, res) => {
    res.sendFile(path.join(__dirname + '/uploads/images/' + req.params.images));
})

app.get('/uploads/templates/:folderId/:imageName', (req, res) => {
    res.sendFile(path.join(__dirname + '/uploads/templates/' + req.params.folderId + '/'+req.params.imageName));
})

app.get('/uploads/userTemplates/:folderId/:imageName', (req, res) => {
    res.sendFile(path.join(__dirname + '/uploads/userTemplates/' + req.params.folderId + '/'+req.params.imageName));
})

app.listen(3001, function () {
    console.log("Started application on port %d", 3001);
});
