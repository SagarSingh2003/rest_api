const express = require('express');
const mongoose = require('mongoose');
const { connect } = require('mongoose');
const {connectDB} = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config();

//Connection URL 
MONGODB_URI='mongodb+srv://iamsagar762:Sagar10%40singh@cluster0.1x5j95v.mongodb.net/?retryWrites=true&w=majority'




PORT = 3000

//Database Name
const dbName = 'notable-api'


//creating the instance of express 
const app = new express();

//Connecting to the database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//pointing the server to the note_routes directory to use the router
app.use('/' , require('./app/routes/note_routes'));

//listening server
app.listen(3000 , () => {
    console.log('Server listening at port : 3000');
})