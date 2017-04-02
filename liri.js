var fs = require("fs");
var spotify = require('spotify');

// Array
var searchArray = process.argv;
// Storage Var
var songName = "";
// Loop to hit multiple words in a user query
for (var i = 3; i < searchArray.length; i++) {
  if (i > 2 && i < searchArray.length) {
    songName = songName + "+" + searchArray[i];
  } else {
    songName += searchArray[i];
  	}
}

	spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    } else if (process.argv[2] === "spotify-this-song"){
    		console.log(data)
    		console.log(data.tracks.items[0])
    	}
	})
