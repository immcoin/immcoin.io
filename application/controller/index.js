var express = require('express'),
    router = express.Router();
var values = require('../../assets/mockdb/profit.json');
var mem = require('../../assets/mockdb/members.json');

router.get('/', function(req, res) {
    console.log(values);
    res.render('index', {title : 'HOME', data : values, members : mem});
});

module.exports = app => { app.use('/', router); }

