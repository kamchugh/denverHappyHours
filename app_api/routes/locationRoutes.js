var express = require('express');
var router = express.Router();
var Ctrl = require('../controllers/locationCtrl');

// /employee prefix

router.get('/', Ctrl.locations);

router.get('/:id', Ctrl.showOne);

router.get('/neighborhood/:neighborhood', Ctrl.showByNeighborhood);

router.get('/deal/:deal', Ctrl.showByDeal);

router.get('/time/:time', Ctrl.showByDealTime);

router.get('/name/:name', Ctrl.showByName);

router.get('/day/:day', Ctrl.showByDay);

router.post('/', Ctrl.create);

router.post('/addDeal/:name', Ctrl.addDeal);

router.get('/username/:username', Ctrl.showByUsername);

router.put('/:id', Ctrl.update);

router.delete('/:id', Ctrl.destroy);

module.exports = router;