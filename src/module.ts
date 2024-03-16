import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
  .addRadio({
    path: 'meterType',
    name: 'Meter Type',
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
      ],
    }
  })
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
      defaultValue: 20
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
      showIf: (config) => config.borderSize>0

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
    })
    .addUnitPicker({
      path: 'units',
      name: 'Units',
      description: 'Units',
      showIf: (config) => config.showUnits
    })
    .addStringArray(
      {
        path: 'nameConverter',
        name: 'Name Converter',
        description: 'Name converter'
        , defaultValue: ["name_a:becomes_b"]
      })

});
