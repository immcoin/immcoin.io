var express = require('express'),
    router = express.Router();

router.get('/signin', function(req, res) {
    res.send('login page');
});

router.get('/data', function(req, res) {
    res.json({ sales : '300000', stock : '300000000'});
});
module.exports = app => { app.use('/', router); }