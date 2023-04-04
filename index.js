
const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
var cors = require('cors')
const authRouter = require('./routes/auth');
const contactRouter = require('./routes/contact');
const dashboardRouter = require('./routes/dashboard');
const templateRouter = require('./routes/template');
const userRouter = require('./routes/user');


var app = express()
app.use(cors())
    
// const homePath = path.join(__dirname, 'controllers');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use('/auth', authRouter);
app.use('/contact', contactRouter);
app.use('/dashboard', dashboardRouter);
app.use('/template', templateRouter);
app.use('/user', userRouter);

app.get('/uploads/images/:images',(req,res)=>{
    res.sendFile(path.join(__dirname+'/uploads/images/'+req.params.images))
})

app.get('/uploads/templates/:folderId/thumbnail.jpg',(req,res)=>{
    res.sendFile(path.join(__dirname+'/uploads/templates/'+req.params.folderId+'/thumbnail.jpg'))
})

app.listen(3001, function () {
    console.log("Started application on port %d", 3001)
});
