const { body,validationResult } = require("express-validator");
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

exports.signup = [
  body('username', 'Enter Username').trim().isLength({min:1}).escape(),
  body('password', 'Enter Password of min 8 character').trim().isLength({min:8}).escape(),
  body('confirmPassword', 'Confirm Password').custom((value, {req})=>{
    if(value !=req.body.password) {
      return next('Password Confirmation did not match')
    }
    return true;
  }),
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.json({
        username: req.body.username,
        errors: errors.array()
      });
      return;
    } 
    else {
      var user = new User(
        {
          username: req.body.username
        }
      );
      bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
        if(err) {return next(err);}
        user.set('password',hashedPassword);
        user.save(err=>{
          if(err) {return next(err);}
          res.json({
            message: "Sign up succesfull",
            user: req.user,
          })
        })
      });
    }
  }
];

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(404).json({message: 'login failed'}); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({user: user});
    });
  })(req, res, next);
}

exports.logout = function (req, res) {
  req.logout();
  res.redirect("/");
};