// Require Dependecies
require('dotenv').config()
var fs = require("fs");
var spotify = require("spotify");
var Twitter = require("twitter");
var request = require("request");



var keys = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});


// Array
var searchArray = process.argv;
// Storage Var
var userInput = "";
// Loop to hit multiple words in a user query
for (var i = 3; i < searchArray.length; i++) {
    userInput = userInput + "+" + searchArray[i];
}


  //Spotify
	spotify.search({ type: 'track', query: userInput }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
           return;
      } else if (process.argv[2] === "spotify-this-song"){
    	  // console.log(data.tracks.items[0])
        console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
    		console.log("Album Name: " + data.tracks.items[0].album.name);
    	}
	});

  //Twitter my-tweets
    keys.get('statuses/user_timeline', function(err, tweets, response){
        if(err){
          console.log(err)
        } else if (process.argv[2] === "my-tweets"){
           //  for ( var i = 0; i <= tweets.length; i++ )
           //  console.log(tweets[i].text + " " + tweets.user[i])
           console.log(tweets[0].text)
           console.log(tweets[1].user.created_at)
            }
    }); 
       
 



  //Request movie-this
  request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json", function (err, response, body) {
      if (err) {
        console.log("Error Occured: " + err);
      } else if (process.argv[2] === "movie-this"){
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Date: " + JSON.parse(body).Released);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country of Origin: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Starring: " + JSON.parse(body).Actors);
        // console.log("Movie Info URL: " + JSON.parse(body).Actors);
      }; 
  });

   // * Rotten Tomatoes URL.

   //FS do-what-it-say

  