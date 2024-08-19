const mongoose = require('mongoose');
require('dotenv').config;
const DB_URL = process.env.DB_URL;

mongoose.connect('mongodb://localhost:27017/hotel',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Database is Connected with server');
})
db.on('disconnected',()=>{
    console.log('Database is Disconnected with server');
})
db.on('error',(err)=>{
    console.log('Error in Database -->',err);
})

module.exports = db;