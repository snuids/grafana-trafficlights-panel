import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
  .addNumberInput({
    path: 'lightsPerLine',
    name: 'Lights Per Line',
    description: 'Lights Per Line',
    defaultValue: 5,
  })
  .addNumberInput({
    path: 'fontSize',
    name: 'Name Font Size',
    description: 'Size of font',
    defaultValue: 20})    
  .addBooleanSwitch({
    path: 'showValue',
    name: 'Show Value',
    defaultValue: true,
  })
  .addNumberInput({
    path: 'valueFontSize',
    name: 'Value Font Size',
    description: 'Size of font',
    defaultValue: 20,
    showIf:  (config) => config.showValue})
  .addBooleanSwitch({
    path: 'showTrend',
    name: 'Show Trend',
    defaultValue: true,
  })
  .addNumberInput({
    path: 'trendFontSize',
    name: 'Trend Font Size',
    description: 'Size of font',
    defaultValue: 20,
    showIf:  (config) => config.showTrend})
});
