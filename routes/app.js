const express = require("express");
const app = express();
const auth=require('../middleware/auth');

const sign = require("./sign/app");

// sing in , up 
app.use("/sign", sign);



module.exports = app;