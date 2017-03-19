const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const passport = require('passport');
const passportConfig = require('./config/passport');
const http= require('http');
const session = require('express-session');
const methodOverride = require('method-override');

const index = require('./routes/index');
const users = require('./routes/users');
const drillGroups = require('./routes/drillgroups');
const drills = require('./routes/drills');
const sessions = require('./routes/sessions');

const config = require('./config/config.json');

const db = require('./models/index');


SALT_WORK_FACTOR = 12;
BASE_URL = 'http://localhost:3006';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `${BASE_URL}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride(function (req, res) {
  console.log('body: ',req.body);
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(function(req, res, next){
  const userHeader = req.get('user');
  if (userHeader){
    let user = JSON.parse(userHeader);
    db.User
      .find({ where: user })
      .then(user=>{
        console.log(user);
        req.user = user;
        next();
      });
  } else {
    req.user = null;
    next();
  }
});

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'123abc',
  resave: false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/drill-groups', drillGroups);
app.use('/drills', drills);
app.use('/sessions', sessions);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
