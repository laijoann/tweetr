"use strict";

module.exports = function makeDataHelpers(db) {
  return {

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
