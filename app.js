
const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const config = require('./config');

const db = require('./db');

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname +'/public'));





app.get("/", function(req, res) {
  res.render("signup");

});


app.use("/signin", require("./routes/signin"));
app.use("/signup", require("./routes/signup"));


app.listen(config.PORT, function() {
  console.log("Server Successfully Running at Port  3000");
});



module.exports = app;
