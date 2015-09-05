#!/usr/bin/env bash

# deletes the public folder
rm -rf public/

# generates a fresh copy of the site
hugo -t lengstorf

# syncs all HTML, XML, CSS, JS, JPG, PNG, and GIF files + removes unused files
aws s3 sync ./public s3://lengstorf.com --cache-control "max-age=86400" --exclude "*" --include "*.html" --include "*.xml"  --include "*.js" --include "*.css" --include "*.png" --include "*.jpg" --include "*.gif" --delete
