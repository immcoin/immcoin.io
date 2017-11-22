var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var glob = require('glob');
var path = require('path');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var fs = require('fs');
var https = require('https');
var forceSsl = require('express-force-ssl');

// c o n f i g u r a t i o n 

// var key = fs.readFileSync(path.join(__dirname, '/keys/private.key'));
// var cert = fs.readFileSync(path.join(__dirname, '/keys/primary.crt'));
// var ca = fs.readFileSync(path.join(__dirname, '/keys/intermediate.crt'));

// var options = {
//     key: key,
//     cert: cert,
//     ca: ca
// };

// https.createServer(options, app).listen(443, function() {
//     console.log('https on port 443');
// });

app.set('views', './application/view');
app.set('view engine', 'pug')

// m i d d l e w a r e s
// app.use(forceSsl);
app.use( favicon( path.join( __dirname, '/assets/images/', 'favicon.ico' ) ) );
app.use( morgan('dev') );
app.use( express.static( path.join( __dirname, '/assets' ) ) );
app.use( express.static( path.join( __dirname, '/bower_components' ) ) );
app.use( bodyParser.urlencoded( { extended : true } ) ); 
app.use( bodyParser.json() );

// r o u t i n g

var controllers = glob.sync( __dirname + '/application/controller/*js');
controllers.forEach( controller => { require(controller)(app); } )
 
app.listen(1337, function() {
    console.log('listening to port 1337');
});