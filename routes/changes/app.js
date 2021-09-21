const express = require("express");
const app = express();
const  sms= require("./sms");

app.use("/", sms);

module.exports = app;