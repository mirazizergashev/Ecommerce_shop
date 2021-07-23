const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const category = require("./category");


// sing in , up 
app.use("/", category);


module.exports = app;