// Require Dependecies
var fs = require("fs");
var spotify = require("spotify");
var twitter = require("twitter")
var request = require("request")

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
        console.log("Artist Name:" + " " + data.tracks.items[0].artists[0].name)
        console.log("Song Name:" + " " + data.tracks.items[0].name)
        console.log("Spotify Preview URL:" + " " + data.tracks.items[0].preview_url)
    		console.log("Album Name:" + " " + data.tracks.items[0].album.name)
    	}
	});

  //Twitter my-tweets




  //Request movie-this
  request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&r=json", function (err, response, body) {
      if (err) {
        console.log("Error Occured: " + err);
      } else if (process.argv[2] === "movie-this"){
        console.log(body)
      }

      // console.log('error:', error); // Print the error if one occurred 
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      // console.log('body:', body); // Print the HTML for the Google homepage. 
  });

   // * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.
   // * Rotten Tomatoes Rating.
   // * Rotten Tomatoes URL.

   //FS do-what-it-says