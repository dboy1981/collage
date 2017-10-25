var keystone = require('keystone');

exports = module.exports = function (req, res) {
  var action = req.params.action;
  if(!action){
    res.jsonp({code:100});
    return;
  }

  controlMachine(action, function(err, message){
    if(err){
      console.log(err);
      res.jsonp({code:500});
      return;
    }
    res.jsonp({code:0, data:message});
  });
};

function controlMachine(action, callback){
  var PORT = 33333;
  var HOST = '127.0.0.1';
  
  var dgram = require('dgram');
  var message = new Buffer(action);
  
  var client = dgram.createSocket('udp4');
  client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
      if (err) return callback(err);
      console.log('UDP message sent to ' + HOST +':'+ PORT);
      client.close();
      callback(null);
  });
}