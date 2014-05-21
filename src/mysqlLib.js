var mysql = require("mysql");
var pool = mysql.createPool({  
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : 'gatech2001',
    database : 'commandcenter'
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};