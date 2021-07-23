const express = require("express");
const app = express();
const stol = require("./table");


app.use("/", stol); 


module.exports = app;