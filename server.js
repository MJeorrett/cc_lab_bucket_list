var express = require('express');
var app = express();
var path = require('path');
// var fs = require('fs');
// var ACCOUNTS_FILE = path.join( __dirname + '/sample.json' );
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = 'mongodb://localhost:27017/countriesBucketList';

app.use( bodyParser.json() );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get( '/bucket-list-countries', function( req, res ) {
  MongoClient.connect(url, function(err, db){
    var countries = db.collection("countries");
    countries.find().toArray(function(err, docs){
      res.json(docs);
      db.close();
    });
  })
});

app.post( '/bucket-list-countries', function( req, res ) {
  MongoClient.connect( url, function( err, db ) {
    var countries = db.collection("countries");
    countries.insert({
      name: req.body.name,
      alpha3Code: req.body.alpha3Code
    });
    res.status( 200 ).end();
    db.close();
  });
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
