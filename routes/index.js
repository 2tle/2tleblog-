var express = require('express');
var router = express.Router();

router.use('/', require('./route/main'));
router.use('/blog', require('./route/blog'));
router.use('/manage', require('./route/manage'));

module.exports = router;