var express = require('express'),
    router = express.Router();

var db = require('../db.js');

router.get('/', function(req, res) {
    res.render('index', {title : 'HOME'});
});

router.post('/', fucntion(req,res) {

});

module.exports = app => { app.use('/', router); }

