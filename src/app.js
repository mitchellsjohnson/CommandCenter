var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressBlocks = require('express-blocks');
var CONFIG = require('nconf');
var mysqlLib = require('./mysqlLib');

CONFIG.argv().env();

//setup express
var app = express();

//setup config loading
if (app.get('env') === 'production') {
    CONFIG.file('config/production.json');
} else if (app.get('env') === 'development') {
    CONFIG.file('config/development.json');
}

//configure the mysql library
mysqlLib.configure(CONFIG.get('database'));

var site = require('./site');
var channel = require('./channel');

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.all('/', site.index);

app.get('/channel', channel.list);
app.get('/channel/:name', channel.view);
app.get('/channel/:name/emergency', channel.emergency);
app.get('/channel/:name/:id', channel.getUrl);
app.get('/channel/:name/:priority/next', channel.next);

var port = CONFIG.get('node').port || 1337;

app.listen(port);