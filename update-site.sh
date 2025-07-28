#!/bin/bash
cp -r ./site ../
git checkout gh-pages
cp -r ../site ./
git add .
