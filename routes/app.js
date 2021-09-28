const express = require("express");
const app = express();
const {authCheck}=require('../middleware/auth');

const  category= require("./category/app");
const  payment= require("./payment/payme");
const  payment2= require("./payment/click");
const cart = require("./cart/app");
const  product= require("./product/app");
const sign = require("./sign/app");
const roles = require("./roles/app");
const user = require("./user/app");
const static = require("./statik/app");
const promokod = require("./promokod/app");
const chat = require("./chat/app");
const changes = require("./changes/app");

// sing in , up 
app.use("/sign", sign);
app.use("/promokod", promokod);
app.use("/chat",authCheck, chat);
app.use("/cart",authCheck, cart);
app.use("/payment", payment);
app.use("/payment", payment2);
// app.use("/product",authCheck, product);
app.use("/category", category);
app.use("/product", product);
app.use("/roles",authCheck, roles);
app.use("/user",authCheck, user);
app.use("/static", static);
app.use("/changes", changes);



module.exports = app;