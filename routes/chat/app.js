const express = require("express");
const app = express();
const chat = require("./chat");


app.use("/", chat);


module.exports = app;