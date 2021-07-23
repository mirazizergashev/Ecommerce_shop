const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const user = require("./user");


// sing in , up 
app.use("/", user);


module.exports = app;