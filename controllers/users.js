var User = require("../models/user");

module.exports = {
  index
};

//var sortKey = req.query.sort || 'name';

function index(req, res, next) {
  res.render("./index", {
    //        users,
    user: req.user,
    name: req.query.name
    //   sortKey
  });
}
