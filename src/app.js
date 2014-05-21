//var http = require('http');
//var port = process.env.port || 1337;

var express = require('express');

var app = express();


//routes
app.get('/', function(req, res) {
    res.send('Please enter a channel <br\> Sample: http://commandcenter.evestment.com/channel/technology \n');
});

app.get('/channel/:name', function(req, res) {
    
    //TODO: add validation of channel name
    var channelName = req.param.name;
    

});

app.listen(3000);