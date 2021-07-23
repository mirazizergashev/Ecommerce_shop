const express = require("express");
const app = express();
const product_sklad = require("./product_sklad");
const product_ichki = require("./product_ichki");
const retsep = require("./retsep");
const statistika = require("./statistika");
const statistika2 = require("./new_statistic");
const my_products = require("./my_products");


app.use("/baza", product_sklad); 
app.use("/ichki", product_ichki); 
app.use("/retsep", retsep); 
app.use("/statistika", statistika); 
app.use("/statistika2", statistika2); 
app.use("/my_products", my_products); 


module.exports = app;