var express = require('express');
var cors = require('cors')
var app = express();


var routes = require('./api/routes/routes');
var User = require('./api/models/userModel');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var testUrl ='mongodb://localhost/usersdb';
var prodUrl = 'mongodb://karbb:7WNmbaoWRJ3y76Ze@cluster0-shard-00-00-9g0i2.mongodb.net:27017,cluster0-shard-00-01-9g0i2.mongodb.net:27017,cluster0-shard-00-02-9g0i2.mongodb.net:27017/users?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
  
 
mongoose.Promise = global.Promise;
mongoose.connect(prodUrl, { useMongoClient: true }); 

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

app.listen(port);

console.log('ThisWarOfMine RESTful API server started on: ' + port);