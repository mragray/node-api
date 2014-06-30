var http = require('http');
var sys = require('sys');
var db = require('./model');

// Add Kitten
var silence = new db.Kitten({ name: 'Silence' });
silence.save(function(err, silence) {
  if (err) return console.error(err);
  silence.speak();
});

// Add Puppy
var linus = new db.Puppy({name: 'Linus'});
linus.save(function(err, linus) {
  if (err) console.error(err);
  linus.speak();
});

// Server Config
var server = http.createServer(function(req, res) {
  if(req.url == '/kittens/') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    db.Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      return res.end(JSON.stringify(kittens));
    });
  } else if(req.url = '/puppies/'){
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    db.Puppy.find(function (err, puppies) {
      if (err) return console.error(err);
      return res.end(JSON.stringify(puppies));
    });
  }
});
server.listen(9000, 'localhost');
console.log('Server running at http://localhost:9000/');