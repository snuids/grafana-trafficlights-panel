#!/bin/zsh

#export GRAFANA_ACCESS_POLICY_TOKEN=TO

echo '===='
echo $GRAFANA_ACCESS_POLICY_TOKEN
version="2.0.14"
version=`cat package.json | grep "version" | cut -f2 -d ':' | sed s/\"//g  | sed s/\ //g  | sed s/,//g`
echo 'Version:'$version

cp README.md ./src/README.md

nvm use v20
yarn build
npx @grafana/sign-plugin@latest
rm -d -r snuids-trend-panel
cp -r dist/ snuids-trend-panel

zip snuids-trend-panel-$version.zip snuids-trend-panel -r

rm packages/snuids-trend-panel-$version.zip
mv snuids-trend-panel-$version.zip ./packages/
