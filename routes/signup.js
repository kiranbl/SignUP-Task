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
  res.render("signup");
});


router.post("/",
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("ERROR");
    }
    return true;
  }),
  function(req, res) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
     
      res.render("status",{errors:{msg:'Entered passwords do not match each other!! Please Try Again',color:'red'}})
    }
    else
    {
      User_Detail.findOne({ Email: req.body.email }, function (errr,user)
      {
        if (user) {
        
          res.render("status",{errors:{msg:'User Already Exists, Please Use Different Email or Try to Sign in',color:'red'}})
        }
  else
  {
    const Username = req.body.username;
      const Email = req.body.email;
      const Password = req.body.password;
  
      const user = new User_Detail({
        Username,
        Email,
        Password
      });
  
      bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(user.Password, salt, function(err, hash) {
          user.Password = hash;
  
        user.save((err,user) =>
        {
          if(err)
          {
            res.render('status',{errors:{msg:'You Have Not Been Registered, Please Try Again Later',color:'red'}} )
          }
          else{
            res.render('status',{errors:{msg:'You Have Been Sucesfully Registered !!! Click Below To Login',color:'blue'}} )
          }
        });
      });
      });
    }
  });










    }
}
);

module.exports = router;
