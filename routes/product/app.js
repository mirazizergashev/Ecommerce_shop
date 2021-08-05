const express = require("express");
const app = express();
const product = require("./product");


// sing in , up 
app.use("/", product);


module.exports = app;