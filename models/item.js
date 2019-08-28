var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema ({
foodName: {type: String},
foodType: {type: String},
expirationDate: {type: String},
location: {type: String},
googleId: String,
userId: String
},
{
timestamps: true
});


module.exports = mongoose.model('Item', itemSchema);

