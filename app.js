const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
var compression = require('compression');
var helmet = require('helmet');
const passport = require('passport');

require('./config/passport');

require('dotenv').config();


var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('err', console.error.bind(console, 'mongodb connection error'));

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({secret: 'secret', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter);
app.use('/api',apiRouter);

// Handle any unhandled error
app.use((err, req, res, next) => {
  if(err) {
    res.status(500).json({message: 'Somethinf went wrong.'});
  }
});

app.listen(process.env.PORT, ()=> console.log(`Server up on ${process.env.PORT}`));