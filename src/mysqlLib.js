var mysql = require("mysql");
var pool = null;

exports.configure = function(config) {
    pool = mysql.createPool({  
        connectionLimit : 10,
        host     : config.host,
        user     : config.username,
        password : config.password,
        database : config.dbName
    });
};

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};