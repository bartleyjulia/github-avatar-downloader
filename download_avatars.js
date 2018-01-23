var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

function noEmptyVariables() {
  console.log('Danger Will Robinson! E.g. Please enter a valid repoOwner and repoName.');
}

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

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
}

if (!repoOwner || !repoName) {
  noEmptyVariables();
}



getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  var avatarsFolder = './avatars';
  if (!fs.existsSync(avatarsFolder)){
    fs.mkdirSync(avatarsFolder);
  }
  result.forEach( function(userinfo){
    downloadImageByURL(userinfo.avatar_url, avatarsFolder + '/' + userinfo.login + '.jpg');
  });
});


