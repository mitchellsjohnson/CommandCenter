var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressBlocks = require('express-blocks');
var CONFIG = require('nconf');
var mysqlLib = require('./mysqlLib');
var cluster = require("cluster");
var http = require("http");
var numCPUs = require("os").cpus().length;

CONFIG.argv().env();

//setup express
var app = express();

//setup config loading
if (app.get('env') === 'production') {
    CONFIG.file('config/production.json');
} else if (app.get('env') === 'development') {
    CONFIG.file('config/development.json');
}

//configure the mysql libraryy
mysqlLib.configure(CONFIG.get('database'));

var site = require('./site');
var broadcasts = require('./controllers/broadcasts');
var urls = require('./controllers/urls'); 
var channels = require('./controllers/channels'); 
var channels_urls = require('./controllers/channels_urls'); 
var urls_custom = require('./controllers/urls_custom'); 
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

//Main Broadcast Operations
app.get('/broadcasts', broadcasts.list);
app.get('/broadcasts/:name', broadcasts.view);
app.get('/broadcasts/:name/emergency', broadcasts.emergency);
app.get('/broadcasts/:name/:id', broadcasts.getUrl);
app.get('/broadcasts/:name/:priority/next', broadcasts.next);


//Channel Maintenance Operations
app.get('/channels', channels.list);
app.get('/channels/addform', channels.addform);
app.post('/channels', channels.save);
app.get('/channels/:id', channels.editform);
app.post('/channels/:id', channels.save_edit);
//todo-how to delete http from a button URL href???
app.get('/channels/delete/:id', channels.delete);

//URL Maintenance Operations
app.get('/urls', urls.list);
app.get('/urls/addform', urls.addform);
app.post('/urls', urls.save);
app.get('/urls/:id', urls.editform);
app.post('/urls/:id', urls.save_edit);
app.get('/urls/:id/delete', urls.delete);

//Associate URLs to Channels Maintenance Operations
app.get('/channels_urls/:channelid', channels_urls.list);
app.get('/channels_urls/:channelid/addform', channels_urls.addform);
app.post('/channels_urls/:channelid', channels_urls.save);
app.get('/channels_urls/:channelid/urls/:urlid/delete', channels_urls.delete);

//Associate a Custom URL with a Channel
app.get('/urls_custom/:transactionId', urls_custom.view);
app.post('/urls_custom', urls_custom.save);

var port = process.env.PORT || CONFIG.get('node').port;

http.createServer(app).listen(port, function() {
    console.log('CommandCenter server listening on port ' + port);
});