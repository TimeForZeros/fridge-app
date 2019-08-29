var express = require('express');
var router = express.Router();
var itemsCtrl = require('../controllers/items');

router.get('/', isLoggedIn, itemsCtrl.index);
router.get('/new', isLoggedIn, itemsCtrl.newItem);
router.get('/fridge', isLoggedIn, itemsCtrl.fridgeCheck);
router.get('/freezer', isLoggedIn, itemsCtrl.freezerCheck);
router.get('/cupboard', isLoggedIn, itemsCtrl.cupboardCheck);
router.get('/:id', isLoggedIn, itemsCtrl.show);
router.post('/', isLoggedIn, itemsCtrl.create);
router.delete('/:id', isLoggedIn, itemsCtrl.deleteItem);



function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;