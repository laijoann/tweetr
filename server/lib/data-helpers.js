"use strict";

const {MongoClient} = require("mongodb");
let ObjectId = require('mongodb').ObjectId;

module.exports = function makeDataHelpers(db) {
  return {

    likeTweet: function(tweetID, callback) {
      //if (database.collection.object has a like key-value) { add to the value array }
      //else (create a like key-value pair where value is an array with the user in it)
      //callback(no error aka null, the value array.length)
      //in the callback, you send back length and 200??
      db.collection("tweets").update(
        { "_id" : new ObjectId(`${tweetID}`) },
        { $set:
          { "likes": ["userA"] }
        }, (err) => {
          if (err) throw err;
          console.log("tweet is.. prolly updated with the like") //TODO
          callback(null)
        }
      )
    },

    likeTweetNum: function(tweetID, callback) {
      db.collection("tweets").find({ "_id" : new ObjectId(`${tweetID}`) }, { "likes": 1, "_id": 0 }).toArray((err, result) => {
        callback(null, result)
      })
    },

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, results) => {
        if (err) throw err;
        callback(null, true);
      })
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) throw err;
        callback(null, tweets)
      })
    }

  }
};
