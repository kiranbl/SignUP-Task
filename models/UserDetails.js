//jshint esversion:6
const mongoose = require("mongoose");




const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    trim: true
  },
  Password: {
    type: String,
    required: true,
    trim: true
  }

});


const User_Detail = mongoose.model("User_Detail", UserSchema);


module.exports = User_Detail;
