var keys 	= require('./keys.js');
var twitter = require('twitter');
 
var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});
 
var params = {screen_name: 'realDonaldTrump'};

var tweets_to_display = [];

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    tweets.forEach(function(user){

    	tweetObject = {

    		post: user.text,
    		time: user.created_at

    	};

    	tweets_to_display.push(tweetObject);

    });

    console.log(tweets_to_display);

  };
});