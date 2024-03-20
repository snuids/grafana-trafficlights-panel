import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addRadio({
      path: 'graphType',
      name: 'Graph Type',
      defaultValue: 'background',
      settings: {
        options: [
          {
            value: 'background',
            label: 'Color',
          },
          {
            value: 'svg',
            label: 'SVG',
          }
          ,
          {
            value: 'traffic',
            label: 'Traffic',
          }
        ],
      }
    })
    .addRadio({
      path: 'meterType',
      name: 'Meter Type',
      defaultValue: 'diff',
      settings: {
        options: [
          {
            value: 'diff',
            label: 'Colorize by Trend',
          },
          {
            value: 'absolute',
            label: 'Colorize by Value',
          }          
        ],
      }
    })
    .addTextInput(
      {
        path: 'svgIcon', name: 'svg source', description: 'svg code'
        , defaultValue: 'M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z'
        , showIf: (config) => config.graphType === 'svg'
      })
    .addTextInput(
      {
        path: 'svgViewBox', name: 'SVG view box', description: 'SVG view box'
        , defaultValue: '0 0 512 512'
        , showIf: (config) => config.graphType === 'svg'
      })
    .addBooleanSwitch(
      {path:'showValueAsOverlay',
      name:'Show Value On SVG',
      defaultValue: false}
    )
    .addSliderInput({
      path: 'lightsPerLine',
      name: 'Lights Per Line',
      description: 'Lights Per Line',
      defaultValue: 5,
      settings: {
        min: 1,
        max: 100
      },
    })
    .addSliderInput({
      path: 'nameFontSize',
      name: 'Label Font Size',
      description: 'Size of font',
      settings: {
        min: 5,
        max: 100
      },
      defaultValue: 20
    })
    .addBooleanSwitch({
      path: 'invertedScale',
      name: 'Invert Scale',
      defaultValue: true,
    })
    .addNumberInput({
      path: 'minimumAbsoluteChange',
      name: 'Minimum Absolute Change',
      description: 'Minimum Absolute Change to colorize the value. Use 0 for always red or green',
      defaultValue: 20,
      showIf: (config) => config.meterType==="diff"
    })
    .addBooleanSwitch({
      path: 'sortByDiff',
      name: 'Sort by trends',
      description: 'Sort the results per trend',
      defaultValue: true,
      showIf: (config) => config.meterType==="diff"
    })
    .addNumberInput({
      path: 'thresholdMinValue',
      name: 'Threshold Minimum Value',
      description: 'Minimum Threshold Value',
      defaultValue: 100,
      showIf: (config) => config.meterType==="absolute"
    })
    .addNumberInput({
      path: 'thresholdMaxValue',
      name: 'Threshold Maximum Value',
      description: 'Maximum Threshold Value',
      defaultValue: 1000,
      showIf: (config) => config.meterType==="absolute"
    })
    .addBooleanSwitch({
      path: 'useBackgroundColor',
      name: 'Use Specific Background Color',
      defaultValue: false,
    })
    .addColorPicker({
      path: 'backgroundColor',
      name: 'Background Color',
      description: 'Color of background',
      defaultValue: "orange",
      showIf: (config) => config.useBackgroundColor

    })
    .addColorPicker({
      path: 'foregroundColor',
      name: 'foreground Color',
      description: 'Color of font',
      defaultValue: "black",
      showIf: (config) => config.useBackgroundColor

    }).addSliderInput({
      path: 'margin',
      name: 'Margin Size',
      description: 'Size of margin',
      settings: {
        min: 0,
        max: 30
      },
      defaultValue: 2
    })
    .addSliderInput({
      path: 'borderSize',
      name: 'Border Size',
      description: 'Size of border',
      settings: {
        min: 0,
        max: 30
      },
      defaultValue: 2
    })

    .addColorPicker({
      path: 'borderColor',
      name: 'Border Color',
      description: 'Color of border',
      defaultValue: "black",
      showIf: (config) => config.borderSize > 0

    })
    .addSliderInput({
      path: 'borderRadius',
      name: 'Border Radius',
      description: 'Radius of panel',
      settings: {
        min: 0,
        max: 100
      },

      defaultValue: 0
    })
    .addBooleanSwitch({
      path: 'showValue',
      name: 'Show Value',
      defaultValue: true,
    })
    .addSliderInput({
      path: 'showValueDigits',
      name: 'Value Digits',
      description: 'Number of digits of value',
      defaultValue: 2,
      settings: {
        min: 0,
        max: 8
      },
      showIf: (config) => config.showValue
    })
    .addSliderInput({
      path: 'valueFontSize',
      name: 'Value Font Size',
      description: 'Size of font',
      defaultValue: 20,
      settings: {
        min: 5,
        max: 100
      },
      showIf: (config) => config.showValue
    })
    .addBooleanSwitch({
      path: 'showTrend',
      name: 'Show Trend',
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showTrendAsPercentage',
      name: 'Show Trend As Percentage',
      defaultValue: true,
    })    
    .addSliderInput({
      path: 'showTrendDigits',
      name: 'Trend Digits',
      description: 'Number of digits of trends',
      defaultValue: 2,
      settings: {
        min: 0,
        max: 8
      },
      showIf: (config) => config.showTrend
    })
    .addSliderInput({
      path: 'trendFontSize',
      name: 'Trend Font Size',
      description: 'Size of font',
      defaultValue: 20,
      settings: {
        min: 5,
        max: 100
      },
      showIf: (config) => config.showTrend
    })
    .addBooleanSwitch({
      path: 'showUnits',
      name: 'Show Units',
      defaultValue: true,
      showIf: (config) => config.showValue
    })
    .addUnitPicker({
      path: 'units',
      name: 'Units',
      description: 'Units',
      showIf: (config) => config.showUnits && config.showValue
    })
    .addStringArray(
      {
        path: 'nameConverter',
        name: 'Name Converter',
        description: 'Name converter'
        , defaultValue: ["name_a:becomes_b"]
      })

});
