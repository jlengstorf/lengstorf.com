#!/usr/bin/env bash

# Usage:
#   ./develop.sh
#     -> creates a local Hugo server at http://localhost:1313/
#
#   ./develop.sh example.dev
#     -> creates a local Hugo server at http://example.dev:1313/

# Hugo doesn’t delete, so we drop the whole dir to make sure we’re current.
rm -rf dev/

# Check if a development URL was supplied
if [ -z "$1" ]; then
  DEV_URL=""
else
  DEV_URL="-b $1"
fi

# Start Hugo’s dev server with a
hugo server -wDd dev $DEV_URL
