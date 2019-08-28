var Item = require("../models/item");

module.exports = {
  index,
  newItem,
  create,
  show,
  deleteItem,
  updateItem
  //fridgeCheck

};

function updateItem(req, res, next) {
  Item.findByIdAndUpdate(req.params.id , function(err, items) {
      res.redirect("/items");
  });
}

// function fridgeCheck(req,res){
//   Item.find(req.params.id)
// }

function deleteItem(req, res, next) {
  Item.findByIdAndRemove(req.params.id , function(err, items) {
      res.redirect("/items");
  });
}

function show(req, res) {
  Item.findById(req.params.id, function(err, movie) {
    res.render('items/show', { items });
  });
}

function create(req, res) {
  var item = new Item(req.body);
  item.save(function(err) {
    if (err) return res.redirect("/items/new");
    console.log(item);
    res.redirect("/items");
  });
}

function newItem(req, res) {
  res.render("items/new", {
    user: req.user,
    name: req.query.name
  });
}

function index(req, res, next) {
  console.log(req.query);
  // Make the query object to use with Item.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  // Default to sorting by name
  let sortKey = req.query.sort || "name";
  Item.find(modelQuery)
    .sort(sortKey)
    .exec(function(err, items) {
      if (err) return next(err);
      // Passing search values, name & sortKey, for use in the EJS
      res.render("items/index", {
        items,
        user: req.user,
        name: req.query.name
        //     sortKey
      });
    });
}
