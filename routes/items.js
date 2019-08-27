var express = require('express');
var router = express.Router();
var itemsCtrl = require('../controllers/items');
var usersCtrl =require('../controllers/items')

router.get('/', itemsCtrl.index);
router.get('/new', itemsCtrl.newItem);

module.exports = router;