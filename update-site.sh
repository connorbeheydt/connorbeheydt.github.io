#!/bin/bash
cp -r ./site ../
git checkout gh-pages
if [ $? -eq 0 ]; then
    echo Checkout success.
    rm -r ./*
    cp -r ../site/* ./
    rm -r ../site
    touch .nojekyll
    git add .
else
    echo Checkout failed.
fi
