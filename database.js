const mongoose = require('mongoose');
require('dotenv').config;
const URL=process.env.DB_URL;

mongoose.connect(URL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Database is Connected with server');
})
db.on('disconnected',()=>{
    console.log('Database is Disconnected with server');
})
db.on('error',()=>{
    console.log('Error in Database');
    ;
})

module.export = db;