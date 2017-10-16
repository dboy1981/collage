var keystone = require('keystone');
var Post = keystone.list('Post');

function removeHTMLTag(str) {
  str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
  str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
  //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
  str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
  return str;
}

exports = module.exports = function (req, res) {
  var category = req.query.t;
  if(!category) {
    category = 'leader';
  }

  var page = req.query.page || 1;
  var limit = req.query.limit || 1200;
  var sort = category == 'news' ? '-creationdate' : 'creationdate';

  //console.log(category, page, limit);

  Post.model.find({category: category})
    .limit(parseInt(limit))
    .skip((page - 1) * limit)
    .sort(sort)
    .exec(function(err, posts) {
      if(err){
        res.jsonp({code:500,data:err});
        return;
      }
      var result = null;
      if (category === 'news') {
        result = posts.map(item => {
          return {
            _id: item._id,
            title: item.title,
            creationdate: item.creationdate
          };
        });
      } else {
        result = posts.map(item => {
          return {
            _id: item._id,
            title: item.title,
            creationdate: item.creationdate,
            content: removeHTMLTag(item.content).substr(0, 30) + '...',
            position: item.position,
            avator: item.avator.filename,
            status: item.status
          };
        });
      }
      res.jsonp({code:0, data:result || posts});
    });
};