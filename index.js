var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require("express-session");
var FileStore = require('session-file-store')(session);
const dotenv = require('dotenv').config()
const fileUpload = require('express-fileupload');

var app = express();



app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true)
  
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
    // console.log(req.body)
    next();
  });

app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var main = require('./routes/app');

app.use(cookieParser(process.env.SESSION || "sxdsxs@!#$%^cscs"));
app.use(session({
    secret: process.env.SESSION || "sxdsxs@!#$%^cscs",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: require('path').join(require('os').tmpdir(), 'session-store') }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: false }
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: {
            message: "Elektron magazinga xush kelibsiz !"
        }
    })
});

var port = process.env.PORT || '8090'

app.listen(port, () => {
    console.log(`Server running on ${port}-port...`)
})