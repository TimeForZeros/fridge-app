var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema ({
name: {type: String},
foodType: {type: String},
expirationDate: {type: Date},
inputDate: {type: Date},
location: {type: String}
});


module.exports = mongoose.model('Item', itemSchema);

