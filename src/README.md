# Description

This grafana panel displays traffic lights based on the data source most recent time aggregation. It is possible to tune the thresholds and to limit the number of traffic lights per line. This is the grafana version of the same plugin available for kibana here: https://github.com/snuids/TrafficLightVisKibana5.5

The plugin was tested with Elastic Search 5.5 as data source.
The trend is computed between the last and previous date aggregation of the serie.

## Installation

Copy the dist folder in your grafana plugin directory and rename it to trafficlight.

# Screenshots

## Showcase

![Traffic Lights](https://raw.githubusercontent.com/snuids/trafficlights-panel/master/src/img/screenshot-traffic-showcase.jpg)
![Traffic Lights2](https://raw.githubusercontent.com/snuids/trafficlights-panel/master/src/img/screenshot-traffic-showcase2.jpg)

## Metrics Configuration

![Traffic Lights](https://raw.githubusercontent.com/snuids/trafficlights-panel/master/src/img/screenshot-traffic-metrics.jpg)

## Panel Options

![Traffic Lights](https://raw.githubusercontent.com/snuids/trafficlights-panel/master/src/img/screenshot-traffic-options.jpg)

# Versions
## v1.0.0 (16/Mar/2024)
- First version

Traffic lights

- For the logo field use 'grafana'.
- Examples (label: query)
  - Downloads: $.downloads
  - Catalog Version: $.version
  - Grafana Dependency: $.grafanaDependency
  - Signature Type: $.versionSignatureType

