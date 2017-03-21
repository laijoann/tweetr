$( document ).ready(function() {
  function createTweetElement (tweetObject) {


    return 
  }


});


Within the app.js file, we are going to define a function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

The tweet data object that the function will take will have all the necessary tweet data:

{
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
This object is taken directly from the tweets.json file which is used to seed the tweets in MongoDB. You can see it there.

In the future we will be loading these objects from our Express server via an AJAX GET request (the server will fetch the data from Mongo). For now, since we don't have that implemented, we will temporarily "hard code" the objects in our app.js.
Recall that you can use jQuery to construct new elements using the $ function, like so: var $tweet = $("<article>").addClass("tweet");
You'll want to append additional DOM elements also created via jQuery to the parent, effectively building a DOM structure
This function shouldn't insert the created DOM structure to the page. It should instead just return the $tweet to the caller
You can test your function like so:

Once implemented correctly, the exact same tweet component should be rendered into the tweets container, with the same CSS styles applied to it as before when you had it hardcoded.
