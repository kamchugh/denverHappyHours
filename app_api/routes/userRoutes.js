var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/userCtrl');

router.get('/', Ctrl.users);

router.get('/:id', Ctrl.showOne);

router.post('/create', Ctrl.create);

router.put('/update/:id', Ctrl.update);

router.delete('/destroy/:id', Ctrl.destroy);

module.exports = router;