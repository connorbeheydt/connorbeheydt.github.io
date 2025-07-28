#!/bin/bash
cp -r ./site ../
cp .nojekyll ../site
git checkout gh-pages
cp -r ../site ./
rm -r ../site
git add .
