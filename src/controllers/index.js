var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
     res.render('index',{page_title:"Index - CommandCenter"});
 // res.render('index', { title: 'Express' });
});

module.exports = router;
