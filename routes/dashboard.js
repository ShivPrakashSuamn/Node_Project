const { Router } = require('express');
    const dashboardController = require('../controllers/dashboard');
const app = Router();
  
    app.get('/', dashboardController.index);
  
module.exports = app;
