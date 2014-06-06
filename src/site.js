exports.index = function(req, res){
  //res.render('index', { title: 'Command Center', sampleUrl: 'http://commandcenter.evestment.com/channel/technology' });
  res.render('index',{page_title:"Home - CommandCenter"});
};