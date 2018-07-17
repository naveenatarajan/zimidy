const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express()

app.use(bodyParser.urlencoded({ extended : true}))

app.use(bodyParser.json())

app.get('/',(req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, ()=> {
    console.log("Server is listening on port 3000");
})

