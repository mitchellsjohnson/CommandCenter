var mysqlLib = require('../mysqlLib');
/*
 * GET channels listing.
 */

exports.list = function(req, res){

  mysqlLib.getConnection(function(err,connection){
       
        var sql = 'SELECT channel_id, channel_cd, description, ' +
                  'date_format(created, \'%m/%d/%Y\') created, created_by,  if (updated,date_format(updated, \'%m/%d/%Y\'),null) updated,' +
                  'updated_by FROM channels  ' +
                  'order by greatest(created, updated) desc ';

        var query = connection.query(sql,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('channels/channels',{page_title:"Channels - CommandCenter",data:rows});
                
           
         });
         
        // console.log(query.sql);
    });
  
};

exports.addform = function(req, res){
  res.render('channels/add_channel',{page_title:"Add Channels - CommandCenter"});
};

/*Edit the Channel*/
exports.editform = function(req, res){
    
    var id = req.params.id;
    
    mysqlLib.getConnection(function(err,connection){
        var sql = 'SELECT channel_id, channel_cd, length(channel_cd) channel_cd_length, description, ' +
                  ' length(description) description_length, active ' +
                  ' FROM channels where channel_id = ?'
        var query = connection.query(sql,[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('channels/edit_channel',{page_title:"Edit Channels - CommandCenter",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the Channel*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.getConnection(function (err, connection) {
        
        var data = {
            
            channel_cd    : input.channel_cd,
            description   : input.description,
            created_by    : input.created_by,
            active        : 1
        
        };
        var sql = 'INSERT INTO channels set ?';
        var query = connection.query(sql,[data], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/channels');
          
        });
        
        // console.log(query.sql); //get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    mysqlLib.getConnection(function (err, connection) {
        
     
        var data = {
            
            channel_cd    : input.channel_cd,
            description   : input.description,
            updated_by    : input.updated_by,
            active        : input.active,
           
        
        };
        var sql = 'UPDATE channels set ?, updated=CURRENT_TIMESTAMP() WHERE channel_id = ?';
        var query = connection.query(sql,[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );

          //console.log(query.sql); //get raw query
         
          res.redirect('/channels');
          
        });
    
    });
};


exports.delete = function(req,res){
          
     var id = req.params.id;
     mysqlLib.getConnection(function (err, connection) {
        var sql = 'DELETE FROM channels WHERE channel_id = ?';
        connection.query(sql,[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/channels');
             
        });
        
     });
};


