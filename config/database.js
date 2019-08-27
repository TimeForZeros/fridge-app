var mongoose = require('mongoose');



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// database connection event
mongoose.connection.on('connected', function () {
console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});




// mongoose.connect('mongodb://localhost/items', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// });

// //database connection event

// mongoose.connection.on('connected', function(){
//     console.log(`Mongoose connected to: $(process.env.DATABASE_URL}`);
// });

// var db = mongoose.connection;

// db.on('connected', function() {
//     console.log('THIS WORKS');
// });
