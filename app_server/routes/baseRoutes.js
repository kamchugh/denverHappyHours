var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/baseCtrl');

router.get('/', Ctrl.index);


module.exports = router;