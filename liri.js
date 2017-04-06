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
}; 

  //Spotify
function music(){
	 spotify.search({ type: 'track', query: userInput }, function(err, data) {
           console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
           console.log("Song Name: " + data.tracks.items[0].name);
           console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
    	     console.log("Album Name: " + data.tracks.items[0].album.name);  	
	  })
};

  //Twitter my-tweets
  function oneForty(){
    keys.get('statuses/user_timeline', function(err, tweets, response){
      for ( var i = 0; i < tweets.length; i++ )
      console.log("Twitter Msg: " + tweets[i].text + " " + "Tweeted @: " + tweets[i].created_at)
    }) 
  };     

 //Request movie-this - Function breaks if the info does not exist
function movie(){
  request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json", function (err, response, body) {
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Date: " + JSON.parse(body).Released);
      console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value); 
      console.log("Country of Origin: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Starring: " + JSON.parse(body).Actors);
  })
};

 //FS do-what-it-says
function readRandom(){
   fs.readFile("random.txt", "utf8", function(err, data){
      spotify.search({ type: 'track', query: data}, function(err, data) {
          console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
          console.log("Song Name: " + data.tracks.items[0].name);
          console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
          console.log("Album Name: " + data.tracks.items[0].album.name);   
      })
  })
};

if(process.argv[2] === "spotify-this-song" && process.argv[3] !== ""){
  music()
  } if (process.argv[2] === "movie-this"){
    movie()
    } if (process.argv[2] === "my-tweets"){
      oneForty()
      } if (process.argv[2] === "do-what-it-says"){
          readRandom()
        };



// } else {
//    spotify.search({ type: 'track', query: 'The Sign by Ace of Base' }, function(err, data) {
//            console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
//            console.log("Song Name: " + data.tracks.items[0].name);
//            console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url);
//            console.log("Album Name: " + data.tracks.items[0].album.name);   
//     })
//   }