#!/bin/bash

#export GRAFANA_ACCESS_POLICY_TOKEN=TO

version="2.0.3"

nvm use v20
yarn build
npx @grafana/sign-plugin@latest
rm -d -r snuids-trafficlights-panel
cp -r dist/ snuids-trafficlights-panel

zip snuids-trafficlights-panel-$version.zip snuids-trafficlights-panel -r

rm packages/snuids-trafficlights-panel-$version.zip
cp snuids-trafficlights-panel-$version.zip ./packages/
