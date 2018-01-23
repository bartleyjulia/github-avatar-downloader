# github-avatar-downloader

## Problem Statement

Given a GitHub repository name and owner, download all the contributors' profile images and save them to a subdirectory, `avatars/`.

## Expected Usage

This program should be executed from the command line, in the following manner:

`node download_avatars.js jquery jquery`

... (whatever else you'd like to include)

TODO's

1. Request a given repo
2. Access list of contributors
  a. 'login'
3. Access photos of contributors
  a. 'avatar_url'
4. Store photos of contributors
  a. create avatars folder if undefined
  b. download photos into folder using name from 2.a. above as file photo name