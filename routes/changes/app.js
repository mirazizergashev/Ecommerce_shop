const express = require("express");
const app = express();
const  sms= require("./sms");
const  rating= require("./rating");

app.use("/", sms);
app.use("/rating", rating);

module.exports = app;