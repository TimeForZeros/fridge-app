var Item = require("../models/item");

module.exports = {
  index,
  newItem,
  create,
  show,
  deleteItem,
  updateItem,
  fridgeCheck,
  freezerCheck,
  cupboardCheck
};

function cupboardCheck(req, res) {
  Item.find({ location: "Cupboard" }, function(err, items) {
    res.render("items/cupboard", {
      items,
      user: req.user,
      name: req.query.name
    });
  });
}
function freezerCheck(req, res) {
  Item.find({ location: "Freezer" }, function(err, items) {
    res.render("items/freezer", {
      items,
      user: req.user,
      name: req.query.name
    });
  });
}
function fridgeCheck(req, res) {
  Item.find({ location: "Fridge" }, function(err, items) {
    res.render("items/fridge", {
      items,
      user: req.user,
      name: req.query.name
    });
  });
}
function updateItem(req, res, next) {
  Item.findByIdAndUpdate(req.params.id, function(err, items) {
    res.redirect("/items");
  });
}

function deleteItem(req, res, next) {
  Item.findByIdAndRemove(req.params.id, function(err, items) {
    res.redirect("/items");
  });
}

function show(req, res) {
  Item.findById(req.params.id, function(err, items) {
    res.render("items/show", {
      items,
      user: req.user,
      name: req.query.name
    });
  });
}

function create(req, res) {
  req.body.userId = req.user.id;
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
  Item.find(modelQuery)
    .sort({ expirationDate: 1 })
    .exec(function(err, items) {
      if (err) return next(err);
      res.render("items/index", {
        items,
        user: req.user,
        name: req.query.name
      });
    });
}
