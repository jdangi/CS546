var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://localhost:27017/lab4';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server.');
  findRestaurants(db);
  db.close();
});

var findRestaurants = function(db) {
   var cursor =db.collection('todoItems').find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
        console.dir(doc);
      } else {
        return 0;
      }
   });
};