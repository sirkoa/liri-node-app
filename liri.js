var Twitter = require('twitter');

var tweetkeys = require("./keys"); 

var tweetuser = new Twitter(tweetkeys);


var liricommand = process.argv[2];

switch (liricommand) {
  case "my-tweets":
    tweets();
    break;

  case "deposit":
    deposit();
    break;

  case "withdraw":
    withdraw();
    break;

  case "lotto":
    lotto();
    break;
}
function tweets() {

 var params = {screen_name: 'nodejs'};
tweetuser.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  for (var i = 0; i < 20; i++) {
  tweetuser.text(tweets.statuses[i].user.name);
}
});
    }
