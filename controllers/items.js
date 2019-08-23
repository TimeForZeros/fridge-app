var Item = require("../models/item");

module.exports = {
  index
};

// function index(req, res) {
//   Item.find({}, function(err, items) {
//     res.render("items/index", { items });
//   });
// }

function index(req, res) {
    res.render('items/index'); // change this
}