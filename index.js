

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function (req, res) {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/editor', function (req, res) {
  res.sendFile('editor.html', { root: __dirname + '/public' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});