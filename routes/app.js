const express = require("express");
const app = express();
const auth=require('../middleware/auth');

const sign = require("./sign/app");
const user = require("./user/app");
const static = require("./statik/app");

// sing in , up 
app.use("/sign", sign);
app.use("/user", user);
app.use("/static", static);



module.exports = app;