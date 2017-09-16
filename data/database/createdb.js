var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/poloniexdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_1", function(err, res) {
    if (err) throw err;
    console.log("min_1 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_5", function(err, res) {
    if (err) throw err;
    console.log("min_5 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_15", function(err, res) {
    if (err) throw err;
    console.log("min_15 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_30", function(err, res) {
    if (err) throw err;
    console.log("min_30 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_60", function(err, res) {
    if (err) throw err;
    console.log("min_60 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_120", function(err, res) {
    if (err) throw err;
    console.log("min_120 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_240", function(err, res) {
    if (err) throw err;
    console.log("min_240 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_1440", function(err, res) {
    if (err) throw err;
    console.log("min_1440 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_10080", function(err, res) {
    if (err) throw err;
    console.log("min_10080 created!");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("min_43200", function(err, res) {
    if (err) throw err;
    console.log("min_43200 created!");
    db.close();
  });
});