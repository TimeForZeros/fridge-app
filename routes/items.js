var express = require('express');
var router = express.Router();
var itemsCtrl = require('../controllers/items');

router.get('/', itemsCtrl.index);

module.exports = router;