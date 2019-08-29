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

function updateItem (req, res, next)  {
  Item.findById(req.params.id, function(err, items) {
    items.location = req.body.location;
    items.save(function(err) {
      if (err) return res.redirect("/items");
      res.redirect(`/items/${req.params.id}`);
        });
  });
}
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

function deleteItem(req, res, next) {
  Item.findByIdAndRemove(req.params.id, function(err, items) {
    res.redirect("/items");
  });
}

function show(req, res) {
  req.body.userId = req.user.id;
  Item.findById(req.params.id, function(err, items) {
    console.log(items);
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
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  console.log('hello');
  console.log(today);
  console.log(dd);
  console.log(req.query);
  let modelQuery = req.query.name
  ? { name: new RegExp(req.query.name, "i") }
  : {};
  Item.find(modelQuery)
  .sort({ expirationDate: 1 })
  .exec(function(err, items) {
    console.log(modelQuery);
      if (err) return next(err);
      res.render("items/index", {
        items,
        user: req.user,
        name: req.query.name
      });
    });
}


