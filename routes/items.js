var express = require('express');
var router = express.Router();
var itemsCtrl = require('../controllers/items');
var usersCtrl =require('../controllers/items')

router.get('/', itemsCtrl.index);
router.get('/new', itemsCtrl.newItem);
router.post('/', itemsCtrl.create);




function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;