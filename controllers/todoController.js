var parser = require('body-parser');
var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient;

//Connect to database
var remoteurl = "mongodb://zoutianh:f2H6OYbk12AYHSGa@cluster0-shard-00-00-uiery.mongodb.net:27017,cluster0-shard-00-01-uiery.mongodb.net:27017,cluster0-shard-00-02-uiery.mongodb.net:27017/Epidemic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
// mongo.connect(remoteurl, function(err, db) {
//   if (err) throw err;
//   db.collection('todos').insert({item: "watch more tutorials"});
//   console.log('Data Saved');
//   db.close();
// });
mongoose.Promise = global.Promise;
mongoose.connect(remoteurl);

// Create a schema - this is somewhat like a blueprint for database
var todoSchema = new mongoose.Schema({
  item: String
});
// capitalize first letter because it's the model - based on Schema
var Todo = mongoose.model('flashPartyUser', todoSchema);
// var itemOne = Todo({item: 'get tutorials'}).save(function(err) {
//   if (err) throw err;
//   console.log('Item saved');
// });

var urlencodedParser = parser.urlencoded({extended: false});

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    //get data from mongodb and pass it to view
    Todo.find({}, function(err, info) {
      if (err) throw err;
      res.render('todo', {todos: info});
    })
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    //get data from view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    //delete the requested item from mongodb
    //console.log('I got: ' + req.params.item);
    //console.log("Deleting " + req.params.item.replace(/\-/g, ' ') + ' for you!');
    Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};
