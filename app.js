var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var glob = require('glob');
var path = require('path');
var morgan = require('morgan');
var favicon = require('serve-favicon');


// c o n f i g u r a t i o n 
app.set('views', './application/view');
app.set('view engine', 'pug')

// m i d d l e w a r e s
app.use( favicon( path.join( __dirname, '/assets/images/', 'favicon.ico' ) ) );
app.use( morgan('dev') );
app.use( express.static( path.join( __dirname, '/assets' ) ) );
app.use( express.static( path.join( __dirname, '/bower_components' ) ) );
app.use( bodyParser.urlencoded( { extended : true } ) ); 
app.use( bodyParser.json() );

// r o u t i n g

var controllers = glob.sync( __dirname + '/application/controller/*js');
controllers.forEach( controller => { require(controller)(app); } )
 
app.listen(3000, function() {
    console.log('listening to port 3000');
});