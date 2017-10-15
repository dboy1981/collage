var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {
  var id = req.query.id;
  if(!id) {
    res.jsonp({code:100, data:'参数错误！'});
    return;
  }

  Post.model.findOne({_id: id})
    .exec(function(err, post) {
      res.jsonp({code:0, data:post});
    });
};