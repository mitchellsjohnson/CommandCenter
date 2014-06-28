var mysqlLib = require('../mysqlLib');


exports.view = function(req, res) {
   var transactionId = req.params.transactionId;
    
    mysqlLib.getConnection(function(err,connection){
        var sql = 'SELECT  json_data FROM custom_urls_metadata where custom_urls_metadata_id = ?'

        
        connection.query(sql,transactionId,function(err,rows)
        {
            var JSONData = JSON.parse(rows[0].json_data);

            console.log("JSON_DATA:  " + rows[0].json_data);
            console.log("JSONData.color: " + JSONData.color);
            var template = JSONData.view_template;
       
           
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('urls/custom/'+template ,{data:rows });
        
           
         });
         
         //console.log(query.sql);
    }); 
};


/*Save the Custom URL and associate it to channel as Emergency "0" priority*/

exports.save = function(req,res){
    

    var inputRaw = JSON.stringify(req.body);
    var inputParsed = JSON.parse(JSON.stringify(req.body));
    var description = inputParsed.description;
    var channelCd = inputParsed.channel_cd;
    var createdBy = inputParsed.created_by;


    mysqlLib.getConnection(function (err, connection) {
       
        connection.beginTransaction(function(err) {
          if (err) { throw err; }
          var sql = 'INSERT INTO custom_urls_metadata SET json_data=?, created=CURRENT_TIMESTAMP(), created_by = ?, start_time=CURRENT_TIMESTAMP()';
          connection.query(sql, [inputRaw,createdBy], function(err, result) {
              if (err) { 
                console.log("Error inserting custom_url_metadata : %s ",err );
                connection.rollback(function() {
                  throw err;
                });
              }
          
              console.log('Custom URL Metadata ' + result.insertId + ' added');
              var customUrlsMetadataId = result.insertId;

              //TODO  parameterize URL
              var urlString = 'http://localhost:9999/urls_custom/' +  customUrlsMetadataId
              sql = 'INSERT INTO urls SET url_type_id=(SELECT url_type_id from url_types where url_type_cd = \'Custom\'), ' +
                    ' url_string = ?, description = ?, created_by=?, active = 1';
              connection.query(sql, [urlString, description, createdBy], function(err, result) {
                  if (err) { 
                    console.log("Error inserting url : %s ",err );
                    connection.rollback(function() {
                      throw err;
                    });
                  }
                  var urlId =  result.insertId;
                  console.log('URL ' + result.insertId + ' added');
       
                  sql = 'INSERT INTO channel_url_assoc SET channel_id = (SELECT channel_id from channels where channel_cd = ?), url_id=?, priority = 0, display_duration_sec = 0, created=CURRENT_TIMESTAMP(), created_by=?';
                  connection.query(sql, [channelCd, urlId, createdBy], function(err, result) {
                      if (err) { 
                        console.log("Error inserting channel_url_assoc : %s ",err );
                        connection.rollback(function() {
                          throw err;
                        });
                      }
                  console.log('channel_url_assoc added for ' + channelCd);

                  connection.commit(function(err) {
                       if (err) { 
                         console.log("Error commit : %s ",err );
                         connection.rollback(function() {
                           throw err;
                         });
                       }
                       var responseJSON  = {
                           transactionId:   customUrlsMetadataId};
                       res.setHeader('Content-Type', 'application/json');
                       res.end(JSON.stringify(responseJSON));
               });
            });
          });
        });
      });
    });
};





