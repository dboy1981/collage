var keystone = require('keystone');
var request = require('request');
var moment = require('moment');

var weather = null;
var date = moment();
exports = module.exports = function (req, res) {
  if(weather && moment().isSame(date, 'd')){
    res.jsonp({code:0, data: weather, fromcache:1});
    return;
  }
  var url = 'http://api.map.baidu.com/telematics/v3/weather?location=%E4%B8%8A%E6%B5%B7&output=json&ak=EGgzZ22dsboWQEcPQ6KDQLknQd3YkkkP';
  request(url, function (error, response, body) {
    var json = {};
    try{
      json = JSON.parse(body);
    }catch(err){}
    weather = json;
    date = moment();
    res.jsonp({code:0, data: json});
  });
};