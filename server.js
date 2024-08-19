const express = require('express');
const app = express();
const db = require('./database');
require('dotenv').config;
const port = process.env.PORT || 3000;
const menuRoutes = require('./routes/menu');

app.use('/Fooditem',menuRoutes);
app.listen(port,()=>{
    console.log('Server is live');
})