const express = require("express");
const app = express();
const auth = require('../../middleware/auth');
const roles = require("./roles");
const depart = require("./depart");
const pages = require("./pages");
const roles_pages = require("./roles_pages");
const users_roles = require("./users_roles");
const user = require("./users");


// sing in , up 
app.use("/rol", roles);
app.use("/depart", depart);
app.use("/users", user);
app.use("/page", pages); 
app.use("/roles_pages", roles_pages); 
app.use("/users_roles", users_roles); 


module.exports = app;