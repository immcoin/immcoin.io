var express = require('express'),
    router = express.Router();

router.get('/signin', function(req, res) {
    res.send('login page');
});

module.exports = app => { app.use('/', router); }