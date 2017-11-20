var express = require('express'),
    router = express.Router();
var values = require('../../assets/mockdb/profit.json');
var mem = require('../../assets/mockdb/members.json');
var wic = require('../../assets/mockdb/whyimm.json');
var adv = require('../../assets/mockdb/advisers.json');

router.get('/', function(req, res) {
    console.log(wic);
    res.render('index', {title : 'IMM Coin', data : values, members : mem, whyimm: wic, advisers: adv});
});

module.exports = app => { app.use('/', router); }

