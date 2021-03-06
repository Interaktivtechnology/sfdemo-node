const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const debug = require('debug')('FundingSocieties:server');
const session = require('express-session');
const users = require('./routes/users');
const routes = require('./routes/index');
const donation = require('./routes/donation');
const application = require('./routes/application');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'Eko Purnomo',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));

app.use(cors());
const urlPrefix = ''; // process.env.NODE_ENV === 'production' ? 'lndemo' : '';
app.use(`${urlPrefix}`, routes);

app.use(`${urlPrefix}/users`, users);
app.use(`${urlPrefix}/donation`, donation);
app.use(`${urlPrefix}/application`, application);

app.set('trust proxy', 1); // trust first proxy

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
        });
    });
}


module.exports = app;
