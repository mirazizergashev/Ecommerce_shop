const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const sta = require("./statiklar");


// sing in , up 
app.use("/", sta);


module.exports = app;