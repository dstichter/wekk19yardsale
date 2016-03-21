var mongoose = require('mongoose');
var db = 'mongodb://localhost/labdb';
mongoose.connect(db)

var User = require('./models/user.js')
var Item = require('./models/item.js')
var Comment = require('./models/comment.js')

var user1 = new User({
  name: 'David',
  money: 50000,
  password: 'password',
  collectedItems: ['RC Truck', 'Paintball Gun']
});
user1.save(function(err){
  if(err) return err;
  var comment1 = new Comment({
    commentMsg: 'Its an awesome Tank',
    _owner: user1._id,
    itemLink: 'Tank'
  })
  comment1.save(function(err){
    if(err) return err;


    var item1 = new Item({
      itemName: 'Tank',
      _owner: user1._id,
      itemDescription: 'Its a Tank',
      itemPrice:  10000,
      itemSold: false
    });
    item1.save(function(err){
      if(err) return err;
      Item.update({itemName:'Tank'},{$push: { comments: comment1._id}
    });
    })
  })
})

var user2 = new User({
  name: 'Jake From State Farm',
  money: 15000,
  password: 'password',
  collectedItems: ['Khakis']
});
user2.save(function(err){
  if(err) return err;

});
