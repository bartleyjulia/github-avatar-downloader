var request = require('request');
var secret = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };
   request(options, function(err, res, body) {
  var obj = JSON.parse(body);
    cb(err, obj);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  result.forEach( function(userinfo){

    console.log(userinfo.avatar_url);
  })
});
