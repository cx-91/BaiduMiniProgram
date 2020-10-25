#!/bin/bash
rm -fr ./lib
cp -r ./src ./lib
# ../../../../node_modules/.bin/babel ./src -d ./lib
babel ./src -d ./lib
