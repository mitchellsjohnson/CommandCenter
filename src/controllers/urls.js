var mysqlLib = require('../mysqlLib');



exports.display_ryg  = function(req, res){
    
  res.render('urls/custom/ryg_build_alert',{page_title:"Alert - CommandCenter"});
};

/*
 * GET urls listing.
 */

exports.list = function(req, res){

  mysqlLib.getConnection(function(err,connection){
       
        var sql = 'SELECT u.url_id, u.url_string, u.description,ut.url_type_cd, ' +
                  'date_format(u.created, \'%m/%d/%Y\') created, u.created_by,  if (u.updated,date_format(u.updated, \'%m/%d/%Y\'),null) updated,' +
                  'u.updated_by FROM urls u ' +
                  'inner join url_types ut on ut.url_type_id = u.url_type_id order by greatest(u.created, u.updated) desc ';

        connection.query(sql,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('urls/urls',{page_title:"URLs - CommandCenter",data:rows});
                
           
         });
         
   
    });
  
};

exports.addform = function(req, res){

  mysqlLib.getConnection(function(err,connection){
       
        var sql = 'SELECT url_type_id, url_type_cd FROM url_types';

        connection.query(sql,function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('urls/add_url',{page_title:"Add Url - CommandCenter",data:rows});
                
           
         });
         
    });
  
};
  


exports.editform = function(req, res){
    
    var id = req.params.id;
    
    mysqlLib.getConnection(function(err,connection){
        var sql = 'SELECT url_id, url_string, length(url_string) url_string_length, description, ' +
                  ' length(description) description_length, active ' +
                  ' FROM urls where url_id = ?'
        connection.query(sql,[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('urls/edit_url',{page_title:"Edit urls - CommandCenter",data:rows});
                
           
         });
         
       
    }); 
};

/*Save the URL*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    mysqlLib.getConnection(function (err, connection) {
        
        var data = {
            
            url_string    : input.url_string,
            description   : input.description,
            url_type_id   : input.url_type_id,
            created_by    : input.created_by,
            active        : 1
        
        };
        var sql = 'INSERT INTO urls set ?';
        connection.query(sql,[data], function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/urls');
          
        });
        
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    mysqlLib.getConnection(function (err, connection) {
        
        var data = {
            url_string    : input.url_string,
            description   : input.description,
            updated_by    : input.updated_by,
            active        : input.active,
           
        
        };
        var sql = 'UPDATE urls set ?, updated=CURRENT_TIMESTAMP() WHERE url_id = ? ';
        connection.query(sql,[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          
          res.redirect('/urls');
          
        });
    
    });
};


exports.delete = function(req,res){
          
     var id = req.params.id;
     mysqlLib.getConnection(function (err, connection) {
        var sql = 'DELETE FROM urls WHERE url_id = ?';
        connection.query(sql,[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
      
             res.redirect('/urls');
             
        });
        
     });
};



