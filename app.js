var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan'); //Log the error and useful context
let fs = require('fs');
require('dotenv').config();
var cors = require('cors')

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev', {skip: function (req, res) { return res.statusCode < 400 }}));
app.use(logger('dev', {skip: function (req, res) { return res }}));
app.use(logger('combined', {
  skip: function (req, res) { return res.statusCode < 400 },
  stream: fs.createWriteStream(path.join(__dirname, 'public/access.log'), { flags: 'a' })
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/', indexRouter);

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */

module.exports = app;
