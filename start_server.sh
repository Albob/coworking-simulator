#! /bin/bash

set -e

echo Starting the Python server to serve the pages
python3 -m http.server
