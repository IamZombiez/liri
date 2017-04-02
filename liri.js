// Require Dependecies

var fs = require("fs");
var spotify = require("spotify");
var twitter = require("twitter")
var request = require("request")

// Array
var searchArray = process.argv;
// Storage Var
var songName = "";
// Loop to hit multiple words in a user query
for (var i = 3; i < searchArray.length; i++) {
    songName = songName + "+" + searchArray[i];
}

	spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else if (process.argv[2] === "spotify-this-song"){
    	  // console.log(data.tracks.items[0])
        console.log("Artist Name:" + " " + data.tracks.items[0].artists[0].name)
        console.log("Song Name:" + " " + data.tracks.items[0].name)
        console.log("Spotify URL:" + " " + data.tracks.items[0].preview_url)
    		console.log("Album Name:" + " " + data.tracks.items[0].album.name)
    	}
	})

