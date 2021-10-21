const express = require("express");
const app = express();
const dostavka = require("./dostavka");


// sing in , up 
app.use("/", dostavka);


module.exports = app;