#!/bin/bash

#export GRAFANA_ACCESS_POLICY_TOKEN=TO

version="2.0.10"
version=`cat package.json | grep "version" | cut -f2 -d ':' | sed s/\"//g  | sed s/\ //g  | sed s/,//g`
echo 'Version:'$version

cp README.md ./src/README.md

nvm use v20
yarn build
npx @grafana/sign-plugin@latest
rm -d -r snuids-trafficlights2-panel
cp -r dist/ snuids-trafficlights2-panel

zip snuids-trafficlights2-panel-$version.zip snuids-trafficlights2-panel -r

rm packages/snuids-trafficlights2-panel-$version.zip
mv snuids-trafficlights2-panel-$version.zip ./packages/
