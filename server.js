const express = require('express');
const app = express();
const db = require('./database');
require('dotenv').config;
const port = process.env.PORT;
const menuRoutes = require('./routes/menu');


const logRequest = ( req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalUrl}`);
    next();
}
app.use(logRequest);

app.get('/',(req,res) => {
    res.send('Welocome to the hotel');
})
app.use('/Fooditem',menuRoutes);
app.listen(port,()=>{
    console.log('Server is live :', port);
})