var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moongose = require('mongoose');
var debug = require('debug')('tercer-parcial:database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createUserRouter =  require('./routes/createUser');
var viewUserRouter = require('./routes/viewUser');

// MongoDB connection
moongose.connect(process.env.MONGO_URI,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  debug("success Conected to database");
})
.catch(err=>{
  debug(err);
  process.exit(1);
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createUser', createUserRouter);
app.use('/viewUser', viewUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
