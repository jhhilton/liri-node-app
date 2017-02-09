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
    case 'movie':
    	movieThis(value);
    	break;
   	case 'random':
    	readFile();
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
        value = 'The Sign Ace of Base';
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

function movieThis(value){

	if (value == null){
		value = 'Mr. Nobody';
	}
	request('https://api.themoviedb.org/3/search/movie?api_key=b769da0052b0e07bbf3f2fb2f831c0c3&query=' + value, function(error,response,body){
		if (!error && response.statusCode == 200){
            jsonBody = JSON.parse(body);
            console.log('--------');
			console.log('Title: ' + jsonBody.results[0].original_title);
			console.log('Overview: ' + jsonBody.results[0].overview);
			console.log('Year Released: ' + jsonBody.results[0].release_date.substring(0,4));
			console.log('Average Rating: ' + jsonBody.results[0].vote_average);
			console.log('--------');
		}


	})
}

function readFile(){

	// fs.readFile("random.txt", "utf8", function(error, value) {
 //  	spotifyThis(value);

	// });

	    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'movie') {
                movieThis(dataArr[1]);
            }
        }
    });

}