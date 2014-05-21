var mysqlLib = require('./mysqlLib');

function getChannelCode(req) {
    //TODO: add validation that name exists
    return req.params.name;
};

function getViewId(req) {
    //TODO: add validation that id exists
    return req.params.id;
};


exports.view = function(req, res) {
    var channelCode = getChannelCode(req);
    
    mysqlLib.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('select * from channels', function(sqlErr, rows, fields) {
            if (sqlErr) throw sqlErr;

            connection.release();

            res.render('channel/view', {
                title: ' eVestment TV',
                viewUrl: 'http://www.evestment.com'
            });
        });
    });
};

exports.getUrl = function(req, res) {
    var channelName = getChannelCode(req);
    var viewId = getViewId(req);

    mysqlLib.getConnection(function(err, connection) {
        if (err) throw err;

        var sql = 'SELECT u.url_id, ut.url_type_cd, u.url_string, cua.priority, cua.display_duration_sec ' +
            'FROM channels c JOIN channel_url_assoc cua on c.channel_id = cua.channel_id ' +
            'JOIN urls u on cua.url_id = u.url_id ' +
            'JOIN url_types ut on ut.url_type_id = u.url_type_id ' +
            'WHERE c.channel_cd = ' + connection.escape(channelName) +' and u.url_id = ' + connection.escape(viewId);

        connection.query(sql, function(sqlErr, rows, fields) {
            if (sqlErr) throw sqlErr;

            connection.release();
            
            if (!rows || rows.length == 0) {
                res.json({ });
            } else {
                var row = rows[0];
                res.json({ 
                    channelCode: channelName, 
                    id: viewId, 
                    type: row.url_type_id, 
                    url: row.url_string, 
                    priority: row.priority, 
                    duration: row.display_duration_sec
                });
            }
        });
    });
};

exports.next = function(req, res) {
    var channelName = getChannelCode(req);
    var viewId = getViewId(req);

    mysqlLib.getConnection(function(err, connection) {
        if (err) throw err;

        connection.query('', function(sqlErr, rows, fields) {
            if (sqlErr) throw sqlErr;

            connection.release();
        });
    });
};

exports.list = function(req, res) {
    mysqlLib.getConnection(function(err, connection) {
        if (err) throw err;
        
        connection.query('select channel_cd, description from channels where active = 1', function(sqlErr, rows, fields) {
            if (sqlErr) throw sqlErr;

            connection.release();
            
            var channelList = [];
            for (var i = 0; i < rows.length; i++) {
                var channelCode = rows[i].channel_cd;
                var description = rows[i].description;

                channelList.push({ code: channelCode, description: description });
            }

            res.render('channel/list', { title: "Channels", channels: channelList });
        });
    });
};