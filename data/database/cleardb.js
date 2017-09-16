var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/poloniexdb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_1", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_1 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_5", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_5 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_15", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_15 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_30", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_30 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_60", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_60 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_120", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_120 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_240", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_240 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_1440", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_1440 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_10080", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_10080 deleted");
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.dropCollection("min_43200", function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("min_43200 deleted");
    db.close();
  });
});