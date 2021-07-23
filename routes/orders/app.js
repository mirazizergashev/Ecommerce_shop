const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const orders = require("./orders");
const depart_products = require("./depart_products");
const main_order = require("./main_order");
const share_product = require("./share_product");


// sing in , up 
app.use("/share_product", share_product);
app.use("/main_order", main_order);
app.use("/departs", depart_products);
app.use("/", orders);


module.exports = app;