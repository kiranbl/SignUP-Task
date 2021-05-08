//jshint esversion:6

const express = require("express");
const app = express();

const bcrypt = require("bcryptjs");

const ejs = require("ejs");
const bodyparser = require("body-parser");
const {body,
  check,
  validationResult
} = require("express-validator");

app.use(bodyparser.urlencoded({
  extended: true
}));

app.set('view engine', 'ejs');

var router = express.Router();


const User_Detail = require("../models/UserDetails");
router.get("/", function(req, res) {
    res.render("signin");
});


router.post("/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password ").notEmpty()
  ],
  function(req, res) {

    const error = validationResult(req);

    if (!error.isEmpty()) {
      const e = error.array()
      res.render("status",{
        errors: { msg:e[0].msg,
        color:'red'}
      });
     
    }
else {
    const {
      email,
      password
    } = req.body;

    User_Detail.findOne({
      Email:email
    }, function(err, result) {
      if (!result) {
        
        res.render("status",{
          errors: {
            msg: "Invalid Credentials, User Not Found",
            color:'red'
          }
        });
        
      } 
      else
      {
      bcrypt.compare(password, result.Password, function(err, valid) {
        if (!valid) {

          res.render("status",{
            errors: {
              msg: "Invalid Credentials",
              color:'red'
            }
          });
         
        }
        else{


          res
          .status(200)
          .render("status",{errors:{msg:"Welcome ",
          name:result.Username,
            color:'green'}});
  
          }
    
  });

}
    
});
}
      }
);




module.exports = router;
