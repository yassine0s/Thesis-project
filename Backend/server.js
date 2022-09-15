const express = require('express');
const mysql = require('mysql2')
const dbconfig = require('../config/database-config')
pool = mysql.createPool(dbconfig.connection)
const app = express();
app.get('/api',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'adminPortal'})
})
app.get('/users',(req,res)=>{
    console.log('hello')
    res.status(200).json({message:'userportal   '})
})
app.listen(5000)