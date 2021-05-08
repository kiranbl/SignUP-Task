//jshint esversion:6
const mongoose = require('mongoose');

const MONGO_DB = "Auth";
const uri = `mongodb+srv://Kiran:Kiran123@cluster0.yps3n.mongodb.net/${MONGO_DB}`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log(" we're connected!");

});


//localhost:27017/
