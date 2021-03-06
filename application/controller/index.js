var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    marked = require('marked');

var values = require('../../assets/mockdb/profit.json');
var mem = require('../../assets/mockdb/members.json');
var wic = require('../../assets/mockdb/whyimm.json');
var adv = require('../../assets/mockdb/advisers.json');
var mrkt = require('../../assets/mockdb/marketing.json');

    
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

var tnc = marked(marked(fs.readFileSync(path.join( __dirname, '../../assets/terms.md' ), 'utf-8')));



router.get('/', function(req, res) {
    console.log(tnc);
    res.render('index', {title : 'IMM Coin | interday Markets Management Inc.', data : values, members : mem, whyimm: wic, advisers: adv, terms : tnc, marketing : mrkt, terms: tnc});
});

module.exports = app => { app.use('/', router); }

