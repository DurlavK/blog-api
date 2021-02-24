const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const bcrypt = require('bcryptjs');
var compression = require('compression');
var helmet = require('helmet');

require('dotenv').config();

var User = require('./models/User');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(compression());
app.use(helmet());

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'mongodb connection error'));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Successful login
          return done(null, user);
        } else {
          // Passwords do not match
          return done(null, false, {msg: 'Incorrect Password'});
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter);
app.use('/api',apiRouter);

app.listen(process.env.PORT, ()=> console.log(`Server up on ${process.env.PORT}`));