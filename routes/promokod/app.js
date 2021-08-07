const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const promokod = require("./promokod");


// sing in , up 
app.use("/", promokod);


module.exports = app;