var express = require('express');
var app = express();
var path = require('path');
// var fs = require('fs');
// var ACCOUNTS_FILE = path.join( __dirname + '/sample.json' );
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

app.use( bodyParser.json() );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.get( '/bucket-list-countries', function( req, res ) {
  console.log( "GET /bucket-list-countries hit" );
});

app.post( '/bucket-list-countries', function( req, res ) {
  console.log( "POST /bucket-list-countries hit" );
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
