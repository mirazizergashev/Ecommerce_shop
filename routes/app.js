const express = require("express");
const app = express();
const {authCheck}=require('../middleware/auth');

const  category= require("./category/app");
const cart = require("./cart/app");
const sign = require("./sign/app");
const roles = require("./roles/app");
const user = require("./user/app");
const static = require("./statik/app");

// sing in , up 
app.use("/sign", sign);
app.use("/cart",authCheck, cart);
app.use("/category",authCheck, category);
app.use("/roles",authCheck, roles);
app.use("/user",authCheck, user);
app.use("/static", static);



module.exports = app;