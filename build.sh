#!/usr/bin/env bash

npm run clean
npm run build
cp -r ./src/.next ./build/.next
npm run build-server