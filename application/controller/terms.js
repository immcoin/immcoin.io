var express = require('express'),
    router = express.Router(),
    marked = require('marked'),
    fs = require('fs'),
    path = require('path');
    
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

var tnc = marked(marked(fs.readFileSync(path.join( __dirname, '../../assets/un3.md' ), 'utf-8')));



router.get('/terms', function( req, res ) {
    res.render('terms', {title : 'TERMS AND CONDITION', terms : tnc});
    // res.send(marked(fs.readFileSync(path.join( __dirname, '../../assets/Terms_and_Conditions.md' ), 'utf-8')));
    // res.send(marked(fs.readFileSync(path.join( __dirname, '../../assets/un3.md' ), 'utf-8')));
});

module.exports = app => { app.use( '/', router ); }