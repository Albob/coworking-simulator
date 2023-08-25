#! /bin/bash

set -e

if [ $# != 1 ]; then
  echo "Error: missing message argument";
  echo "Usage:";
  echo "  $0 <git_commit_message>";
  exit 1;
fi

COMMIT_MESSAGE="$1"
GH_PAGES="../coworking-simulator-gh-pages/"

cp index.html game.js $GH_PAGES
cd $GH_PAGES
git add -A
git commit -m "$COMMIT_MESSAGE"
git push

echo "Publication successful!"
