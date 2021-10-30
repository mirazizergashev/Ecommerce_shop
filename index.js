var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require("express-session");
var FileStore = require('session-file-store')(session);
const dotenv = require('dotenv').config()
const fileUpload = require('express-fileupload');

var app = express();



app.use((req, res, next) => {

    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true)
  
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
    next();
  });

app.use(fileUpload());

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

var main = require('./routes/app');
// var routes = require('./routes/routes');

app.use(cookieParser(process.env.SESSION || "0sxdsxs@!#$%^cscs"));
app.use(session({
    secret: process.env.SESSION || "0sxdsxs@!#$%^cscs",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({ path: require('path').join(require('os').tmpdir(), 'session-store') }),
    cookie: { maxAge: 3600000, secure: false, httpOnly: false }
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use('/payme-ghvcjhbcfkrhkjdfhkjdfn/:bu',function forceLiveDomain(req, res, next) {
  
    console.log(req.isPayme)
    console.log(1)
    console.log( req.params.bu)
    
      return res.redirect(301, 'https:/checkout.paycom.uz/' + req.params.bu);
   
  });

  app.use('/click-ghvcjhhtrfhhkjdfhkjdfn/service/:bu',function forceLiveDomain(req, res, next) {
  
    console.log(req.isPayme)
    console.log(1)
    console.log( req.params.bu)
    
      return res.redirect(301, 'https:/my.click.uz/services/pay?' + req.params.bu);
   
  });

  
app.use('/', main);
// app.use('/', routes);

app.get('/', (req, res) => {
    return res.status(200).json({
        success: {
            message: "Elektron magazinchaga xush kelibsiz akasi!"
        }
    })
});

var port = process.env.PORT || '8090'

app.listen(port, () => {
    console.log(`Server running on ${port}-port...`)
})