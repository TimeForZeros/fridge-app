var Item = require("../models/item");

module.exports = {
  index
};

// function index(req, res) {
//   Item.find({}, function(err, items) {
//     res.render("items/index", { items });
//   });
// }

function index(req, res, next) {
  console.log(req.query)
  // Make the query object to use with Item.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  Item.find(modelQuery)
  .sort(sortKey).exec(function(err, items) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('items/index', {
      items,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
}
