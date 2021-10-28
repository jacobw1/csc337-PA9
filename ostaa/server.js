/*
  Author: Jacob Williams
  Purpose: server.js contains the  connection to the server and DB
  Useage: node server.js
*/

//creating constant variables
const express =require('express');
const mongoose = require('mongoose');
const app = express();
//digital ocean -> 143.198.105.222
const hostname = 'localhost';
const port = 300;
// degine mongoose and DBURL
const db = mongoose.connection;
const mongoDBURL = 'mongodb://localhost/ostaa';

var Schema = mongoose.schema;

var itemSchema = new Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  stat: String
});
var Item = mongoose.model('Item', itemSchema);

var userSchema = new Schema({
  username: String,
  password: String,
  listings: [{ type : mongoose.Types.ObjectId, ref: 'Item' }],
  purchases: [{ type : mongoose.Types.ObjectId, ref: 'Item' }],
})
var User = mongoose.model('User', userSchema);

mongoose.connect(mongoDBURL, { useNewUrlParser: true});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var newUser = new User({username:"jacobthetallone", password:"drowssap", listings: [], purchases: []})
newUser.save((err) => {if (err) console.log('ERROR IN NEW USER'); console.log('SAVED')});

app.use(express.static('public_html'));

/*
app.get('/chats', function(req, res){
  if(req.url != '/favicon.ico'){
    ChatMessage.find({}).sort({"time":1}) // sorts the DB first
    .exec((err,results) =>{
      var resString = '';
      for(i in results){
        r = results[i];
        resString += '<div class="message"> <strong>'+ r.alias+':</string>'+ r.message+'</div><br>';
      }
      res.end(resString);
    })
  }
});
*/

app.get('/get/users', function(req, res){
  if(req.url != '/favicon.ico'){
    User.find({}).exec((err, results) =>{
      var resString = '';
      for(i in results){
        resString += JSON.stringify(i);
      }
      res.end(resString);
    })
  }
})
