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

function updateItem(req, res, next) {
  Item.findById(req.params.id, function(err, items) {
    items.location = req.body.location;
    items.save(function(err) {
      if (err) return res.redirect("/items");
      res.redirect(`/items/${req.params.id}`);
    });
  });
}
function cupboardCheck(req, res) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  mm = mm.toString();
  dd = dd.toString();
  var dateToday = yyyy.toString() + mm.padStart(2, "0") + dd.padStart(2, "0");
  dateToday = parseInt(dateToday);

  Item.find({ location: "Cupboard" }, function(err, items) {
    res.render("items/cupboard", {
      dateToday,
      items,
      user: req.user,
      name: req.query.name
    });
  });
}
function freezerCheck(req, res) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  mm = mm.toString();
  dd = dd.toString();
  var dateToday = yyyy.toString() + mm.padStart(2, "0") + dd.padStart(2, "0");
  dateToday = parseInt(dateToday);

  Item.find({ location: "Freezer" }, function(err, items) {
    res.render("items/freezer", {
      dateToday,
      items,
      user: req.user,
      name: req.query.name
    });
  });
}
function fridgeCheck(req, res) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  mm = mm.toString();
  dd = dd.toString();
  var dateToday = yyyy.toString() + mm.padStart(2, "0") + dd.padStart(2, "0");
  dateToday = parseInt(dateToday);

  Item.find({ location: "Fridge" }, function(err, items) {
    res.render("items/fridge", {
      dateToday,
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
  //get date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  dd = dd.toString();
  mm = mm.toString();
  var yyyy = today.getFullYear();
  item.inputDate =
    yyyy.toString() + "-" + mm.padStart(2, "0") + "-" + dd.padStart(2, "0");
  console.log(item.inputDate.replace(/-/g, ""));
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
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  mm = mm.toString();
  dd = dd.toString();
  var dateToday = yyyy.toString() + mm.padStart(2, "0") + dd.padStart(2, "0");
  dateToday = parseInt(dateToday);
  var modelQuery = req.query.name
    ? { name: new RegExp(req.query.name, "i") }
    : {};
  Item.find(modelQuery)
    .sort({ expirationDate: 1 })
    .exec(function(err, items) {
      if (err) return next(err);
      res.render("items/index", {
        dateToday,
        items,
        user: req.user,
        name: req.query.name
      });
    });
}
