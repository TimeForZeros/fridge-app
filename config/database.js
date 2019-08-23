var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items', {
    useNewUrlParser: true,
    useCreateIndex: true
});

var db = mongoose.connection;

db.on('connected', function() {
    console.log('THIS WORKS');
});