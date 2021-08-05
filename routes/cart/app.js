const express = require("express");
const app = express();
const cart = require("./cart");


// sing in , up 
app.use("/", cart);


module.exports = app;