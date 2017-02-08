var keys 		= require('./keys.js');
var twitter 	= require('twitter');
var request 	= require('request');
var fs 			= require('fs');
var procedure 	= process.argv[2];
var value 		= process.argv[3];

switch (procedure) {
    case 'tweets':
        getTweets();
        break;
    case 'spotify':
        spotifyThis(value);
        break;
}

function getTweets(){

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
};

function spotifyThis(value) {
    if (value == null) {
        value = 'Helpless';
    }
    request('https://api.spotify.com/v1/search?q=' + value + '&type=track', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonBody = JSON.parse(body);
            console.log('--------');
            console.log('Artist: ' + jsonBody.tracks.items[0].artists[0].name);
            console.log('Song: ' + jsonBody.tracks.items[0].name);
            console.log('Preview URL: ' + jsonBody.tracks.items[0].preview_url);
            console.log('Album: ' + jsonBody.tracks.items[0].album.name);
            console.log('--------');
        }
    });
} 