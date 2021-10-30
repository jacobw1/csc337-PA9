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

var Schema = mongoose.Schema;

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

app.use(express.static('public_html'));

app.set('json spaces', 2);

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get('/get/users', function(req, res){
  if(req.url != '/favicon.ico'){
    User.find({}).exec((err, results) =>{

      res.json(results);
    })
  }
});

app.get('/get/items', function(req, res){
  if(req.url != '/favicon.ico'){
    Item.find({}).exec((err, results) =>{
      res.json(results);
    })
  }
});

app.get('/get/listings/:username',(req, res) =>{
  User.findOne({username: req.params.username }).exec((err, result) =>{
      if (err) return res.end('FAIL');
      if (!result) return res.end('FAIL');
      Item.find({_id: result.listings}).exec((err,listingResults) => {
        res.json(listingResults);
      });
    });
});

app.get('/get/purchases/:username',(req, res) =>{
  User.findOne({username: req.params.username }).exec((err, result) =>{
      if (err) return res.end('FAIL');
      if (!result) return res.end('FAIL');
      Item.find({_id: result.purchases}).exec((err,purchasesResults) => {
        res.json(purchasesResults);
      });
    });
});

app.get('/search/users/:keyword', (req,res) =>{
  User.find({username: {$regex: req.params.keyword }}).exec((err,results) =>{
    res.json(results);
  });
});

app.get('/search/items/:keyword', (req,res) =>{
  Item.find({description: {$regex: req.params.keyword }}).exec((err,results) =>{
    res.json(results);
  });
});

app.post('/add/user/', (req,res) => {
  requestData = req.body;
  var newUser = new User({
    username: requestData.username,
    password: requestData.password,
    listings: [],
    purchases: []
  });
  newUser.save(function(err) {if (err) res.send("FAILED TO ADD USER");});
  res.send('SAVED USER');
});

app.post('/add/item/:username', (req,res) => {
  requestData = req.body;
  User.findOne({username: req.params.username})
  .exec(function(err,result){
    if (err) return res.end('FAIL');
    if (!result) return res.end('FAIL');
    var newItem = new Item({
      title: requestData.title,
      description: requestData.description,
      image: requestData.image,
      price: requestData.price,
      stat: requestData.status
    });
    result.listings.push(newItem._id);
    result.save();

    newItem.save(function(err) {if (err) res.send('FAILED TO ADD ITEM')});

    res.send('SAVED ITEM');
  })
});

app.listen(port,function () {
  console.log(`App listening at http://${hostname}:${port}`);
});
