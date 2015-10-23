#!/usr/bin/env bash

# deletes the public folder
rm -rf public/

# generates a fresh copy of the site
hugo -t lengstorf

# syncs all HTML, XML, CSS, JS, JPG, PNG, and GIF files + removes unused files
aws s3 sync ./public s3://lengstorf.com --cache-control "max-age=86400" --exclude "*" --include "*.html" --include "*.xml"  --include "*.js" --include "*.css" --include "*.png" --include "*.jpg" --include "*.gif" --delete

# creates a CloudFront invalidation batch for the deploy
./invalidate.sh "/*"

# --------------------------------------------------------------------
# VARIOUS AWS COMMANDS
#
# aws s3 sync ./public s3://lengstorf.com --content-type "text/html" --cache-control "max-age=600" --exclude "*" --include "*.html" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "text/xml" --cache-control "max-age=600" --exclude "*" --include "*.xml" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "application/javascript" --cache-control "max-age=31536000" --exclude "*" --include "*.js" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "text/css" --cache-control "max-age=31536000" --exclude "*" --include "*.css" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "image/png" --cache-control "max-age=86400" --exclude "*" --include "*.png" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "image/jpeg" --cache-control "max-age=86400" --exclude "*" --include "*.jpg" --dryrun
# aws s3 sync ./public s3://lengstorf.com --content-type "image/gif" --cache-control "max-age=86400" --exclude "*" --include "*.gif" --dryrun
# aws s3 cp ./public s3://lengstorf.com --cache-control "max-age=86400" --exclude "*" --include "*.html" --include "*.xml"  --include "*.js" --include "*.css" --include "*.png" --include "*.jpg" --include "*.gif" --dryrun
# --------------------------------------------------------------------
# aws s3 cp . s3://lengstorf.com --content-type "text/css" --cache-control "max-age=31536000" --exclude "*" --include "*.css" --recursive --dryrun
# aws s3 cp . s3://lengstorf.com --content-type "image/png" --cache-control "max-age=86400" --exclude "*" --include "*.png" --recursive --dryrun
# aws s3 cp . s3://lengstorf.com --content-type "image/jpeg" --cache-control "max-age=86400" --exclude "*" --include "*.jpg" --recursive --dryrun
# aws s3 cp . s3://lengstorf.com --content-type "image/gif" --cache-control "max-age=86400" --exclude "*" --include "*.gif" --recursive --dryrun
# --------------------------------------------------------------------
