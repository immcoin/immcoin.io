var express = require('express'),
    router = express.Router();
var values = require('../../assets/mockdb/profit.json');

router.get('/', function(req, res) {
    console.log(values);
    res.render('index', {title : 'HOME', data : values});
});

module.exports = app => { app.use('/', router); }

