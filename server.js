const express = require('express');
const app = express();
const db = require('./database');
require('dotenv').config;
const port = process.env.PORT;
const menuRoutes = require('./routes/menu');
const passport = require('./routes/auth_menu');
const logRequest = ( req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalUrl}`);
    next();
}
app.use(passport.initialize());
app.use(logRequest);
const Auth = passport.authenticate('local',{session:false}) 
app.get('/',Auth,(req,res) => {
    res.send('Welocome to the hotel');
})

app.use('/Fooditem',Auth,menuRoutes);

app.listen(port,()=>{
    console.log('Server is live :', port);
})