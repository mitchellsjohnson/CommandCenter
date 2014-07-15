var mysqlLib = require('../mysqlLib');
/*
 * GET channels listing.
 */

exports.list = function(req, res){
  var channel_id = req.params.channelid;
  mysqlLib.getConnection(function(err,connection){
        var sql = 'SELECT  c.channel_id, u.url_id, u.url_string, u.description,ut.url_type_cd, ' + 
                  '        date_format(u.created, \'%m/%d/%Y\') as url_created, u.created_by as url_created_by, ' +
                  '        date_format(cua.created, \'%m/%d/%Y\') as url_mapping_created, cua.created_by as url_mapped_by, cua.priority, ' +
                  '        cua.display_duration_sec ' +
                  'FROM channels c ' +
                  '        inner join channel_url_assoc cua on cua.channel_id = c.channel_id ' +
                  '        inner join urls u on u.url_id = cua.url_id ' +
                  '        inner join url_types ut on ut.url_type_id = u.url_type_id ' +
                  'WHERE u.active = 1 and c.channel_id = ?' +
                  '        order by priority asc';


        connection.query(sql,[channel_id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('channels_urls/channels_urls',{page_title:"Channel URL Mappings - CommandCenter",data:rows, channel_id: channel_id});
                
           
         });
         
      
    });
  
};

exports.addform = function(req, res){
  var channel_id = req.params.channelid;
  mysqlLib.getConnection(function(err,connection){
        var sql = 'SELECT  ' + channel_id + ' as channel_id, u.url_id, u.description ' + 
                  'FROM urls u ' +
                  'WHERE u.active = 1 ' +
                  '        order by url_id desc';

        connection.query(sql,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
      
            res.render('channels_urls/add_channel_url',{page_title:"Map URL to Channel - CommandCenter",data:rows});
                
           
         });

    });



  
};


/*Save the Channel*/
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.getConnection(function (err, connection) {
        
        var data = {
            channel_id              : req.params.channelid,
            url_id                  : input.url_id,
            priority                : input.priority,
            display_duration_sec    : input.displayforseconds,
            created_by              : input.mapped_by
        
        };
        var sql = 'INSERT INTO channel_url_assoc set ?';
	    connection.query(sql,data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/channels_urls/' + req.params.channelid);
          
        });
        
    });
};




exports.delete = function(req,res){
          
     var channel_id = req.params.channelid;
     var url_id = req.params.urlid;
     mysqlLib.getConnection(function (err, connection) {
        var sql = 'DELETE FROM channel_url_assoc WHERE url_id = ? and channel_id = ?';
        
        connection.query(sql,[url_id, channel_id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/channels_urls/' + req.params.channelid);
             
        });
        
     });
};


