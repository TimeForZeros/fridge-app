var User = require("../models/user");

module.exports ={
  
index

}

//var sortKey = req.query.sort || 'name';


function index(req, res, next) {
      res.render('items/index', {
        // users,
        user: req.user,
        name: req.query.name,
    //    sortKey
      });
    }