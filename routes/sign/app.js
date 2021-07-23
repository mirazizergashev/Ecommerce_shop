const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const sign = require("./sign");


// sing in , up 
app.use("/", sign);


module.exports = app;