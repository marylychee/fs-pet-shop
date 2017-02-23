'use strict'

var express = require('express');
var app = express();
var port = process.env.PORT  || 8000;

app.disable('x-powered-by');

app.use(function(req, res){
  var guests = ['Mary', 'Don'];
  res.send(guests);
});

app.listen(port, function() {
  console.log('Listening on post ', port);
});
