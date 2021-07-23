const express = require("express");
const app = express();
const auth=require('../middleware/auth');

const sign = require("./sign/app");
const roles=require('./roles/app');
const orders=require('./orders/app');
const category=require('./categories/app');
const product=require('./product/app');
const table=require('./table/app');

// sing in , up 
app.use("/sign", sign);
app.use("/roles",auth.authCheck, roles); 
app.use("/orders",auth.authCheck, orders); 
app.use("/category",auth.authCheck, category); 
app.use("/table",auth.authCheck, table); 
app.use("/product",auth.authCheck, product); 

//danniy olish
// app.use("/data", doc);



module.exports = app;