const express = require('express');
const mysql = require('mysql2')
const dbconfig = require('./configs/database-config')
const   bodyParser    = require('body-parser');
const   cookieParser  = require('cookie-parser');

pool = mysql.createPool(dbconfig.connection)
const app = express();
const adminRoute  = require('./routes/admin');
const PORT = 5000; // Port of the backend server.

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// setting up header content type
// app.use(function (req, res, next) {
//     req.headers['content-type'] = 'application/json';
//     next();
//   });


// handling requests via router
app.use(adminRoute);






app.listen(PORT, console.log("Server started on port " + PORT));
