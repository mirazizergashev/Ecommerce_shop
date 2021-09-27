const express = require("express");
const app = express();
const payment = require("./payment");


// sing in , up 
app.use("/", payment);


module.exports = app;