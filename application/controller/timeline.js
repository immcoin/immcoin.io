var express = require('express'),
    router = express.Router();

router.get('/timeline', function(req, res) {
    res.render('timeline', { title : 'TIMELINE' });
});

module.exports = app => { app.use('/', router); }