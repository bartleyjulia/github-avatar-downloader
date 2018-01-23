var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

// Creates a callback function for lack of arguments passed to function

function noEmptyVariables() {
  console.log('Danger Will Robinson! E.g. Please enter a valid repoOwner and repoName.');
}

console.log('Welcome to the GitHub Avatar Downloader!');


// Formats url, parses JSON and receives url information


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

//Function for downloading image by URL

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

//Requires arguments, else invokes function noEmptyVariables

if (!repoOwner || !repoName) {
  noEmptyVariables();
}

// Invokes getRepo function

getRepoContributors(repoOwner, repoName, function(err, result) {
  console.log("Errors:", err);
  var avatarsFolder = './avatars';
  //  Creates file folder for photos if non exsistent
  if (!fs.existsSync(avatarsFolder)){
    fs.mkdirSync(avatarsFolder);
  }
  result.forEach( function(userinfo){
    // Invokes downloadImage function and assigns login name to file, assigns files to Avatars folder
    downloadImageByURL(userinfo.avatar_url, avatarsFolder + '/' + userinfo.login + '.jpg');
  });
});


