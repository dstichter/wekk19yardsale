var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');

var app = express();
var db = 'mongodb://localhost/labdb';

var PORT = process.env.PORT || 8000;

mongoose.connect(db)
var User = require('./models/user.js')
var Item = require('./models/item.js')
var Comment = require('./models/comment.js')

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/public/index.html');
});
app.get('/sales', function(req,res){
  Item.find({}).exec().then(function(dbItems) {
     res.json(dbItems);
   });
})
app.post('/api/newItem', function(req, res) {
  var newItem = new Item({
    itemName: req.body.itemName,
    _owner: req.body.owner,
    itemDescription: req.body.itemDiscription,
    itemPrice:  red.body.price,
    itemSold: false
  });

  newItem.save().then(function(dbItem) {
    res.json(dbItem);
  });
});
app.post('/api/newComment', function(req, res) {
  var newComment = new Comment({
    commentMsg: req.body.comment,
    _owner: req.body.owner,
    itemLink: req.body.link
  })
  newComment.save().then(function(dbComment) {
    res.json(dbComment);
  });
});
app.post('/api/buyItem', function(req, res) {
  Item.update({name: req.body.name}, {$set: {itemSold: true}})
  User.update({id: req.body.userId}, {$push: {collectedItems: req.body.name}})
  User.update({id: req.body.userId}, {$inc: {money: req.body.price}})

});
//
//
//
//
app.get('/api/todos', function(req, res) {
  Todo.find({}).exec().then(function(dbTodos) {
    res.json(dbTodos);
  });
});

app.put('/api/todos/:id', function(req, res) {
  Todo.update({_id: req.params.id}, {$set: req.body})
  .then(function(dbTodo) {
    res.json(dbTodo);
  });
});

app.delete('/api/todos/:id', function(req, res) {
  Todo.remove({_id: req.params.id})
  .then(function() {
    res.json({})
  });
});

app.listen(PORT, function() {
  console.log("listening on port", PORT);
});
