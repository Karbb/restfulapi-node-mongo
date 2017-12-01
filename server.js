var express = require('express');
var cors = require('cors');
var jsonProp = require('./properties.json');
var app = express();

var routes = require('./api/routes/routes');
var User = require('./api/models/userModel');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
  
mongoose.Promise = global.Promise;
mongoose.connect(jsonProp.mongo_prod, { useMongoClient: true }); 

var db = mongoose.connection;

db.on('error', err => {
  console.error('Error while connecting to DB: ${err.message}');
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('ThisWarOfMine RESTful API server started on: ' + port);