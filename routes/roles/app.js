const express = require("express");
const app = express();
const roles = require("./roles");


// sing in , up 
app.use("/", roles);


module.exports = app;