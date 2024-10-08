const mongoose = require('mongoose');
require('dotenv').config();
//const DB_UR = process.env.DB_URL;
const DB_UR = process.env.Local_db_url_hotel;

mongoose.connect(DB_UR);

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