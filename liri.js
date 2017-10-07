var Twitter = require('twitter');

var tweetkeys = require("./keys");

var Spotify = require('node-spotify-api');

var tweetuser = new Twitter(tweetkeys);

var request = require("request");

var fs = require("fs");


var liricommand = process.argv[2];
var spotsearch = process.argv[3];

var spotifySong = new Spotify({
  id: '21050ce5bc844471b195ce08b8ecbe73',
  secret: 'ec9d203597e7471184888900ff84015a'
});

switch (liricommand) {
  case "my-tweets":
    tweets();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    command();
    break;
}

function tweets() {

  var params = {
    screen_name: 'nodejs'
  };
  tweetuser.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }

    // Let's loop over your returned tweets and print out the necessary info
    for (var i = 0; i < 20; i++) {
      console.log("User: " + tweets[i].user.name);
      console.log("Tweeted At: " + tweets[i].created_at);
      console.log(tweets[i].text);
      console.log("\n ============ \n");
    }
  });
}

function spotify() {
  spotifySong.search({
    type: 'track',
    query: spotsearch
  }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // This is where the actual returned data lives
    var spotifySongsArr = data.tracks.items;

    // Let's loop over this and print out select info from each
    for (var i = 0; i < spotifySongsArr.length; i++) {
      console.log("Song: " + spotifySongsArr[i].name);
      console.log("Artist: " + spotifySongsArr[i].artists[0].name);
      console.log("Album: " + spotifySongsArr[i].album.name);
      console.log("Link: " + spotifySongsArr[i].external_urls.spotify);
      console.log("\n ============ \n");
    }
  });
}

function movie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + spotsearch + "&y=&plot=short&apikey=40e9cece";
  request(queryUrl, function (error, response, body) {
    console.log(JSON.stringify(body, null, 2))
    if (!error && response.statusCode === 200) {
      console.log("Release Year: " + JSON.parse(body).Year);
    }
  });
}

function command() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }
    console.log(data);
    var dataArr = data.split(",");

    console.log(dataArr);

    spotifySong.search({
      type: 'track',
      query: dataArr[1]
    }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      // This is where the actual returned data lives
      var spotifySongsArr = data.tracks.items;

      // Let's loop over this and print out select info from each
      for (var i = 0; i < spotifySongsArr.length; i++) {
        console.log("Song: " + spotifySongsArr[i].name);
        console.log("Artist: " + spotifySongsArr[i].artists[0].name);
        console.log("Album: " + spotifySongsArr[i].album.name);
        console.log("Link: " + spotifySongsArr[i].external_urls.spotify);
        console.log("\n ============ \n");

      }
    });

  });
}