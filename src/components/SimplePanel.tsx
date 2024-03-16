import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  console.log(theme);

  const convert_ht: any = {};
  for (let conv of options.nameConverter) {
    let spli = conv.split(':');
    if (spli.length > 1) {
      convert_ht[spli[0]] = spli[1];
    }
  }

  let serieNames = data.series.map((s) => {
    if (convert_ht['' + s.name] == null) {
      return s.name;
    }
    return convert_ht['' + s.name];
  });

  const mainStyle = (index: number) => {
    let color = lastvals[index].color;
    let forecolor = 'white';

    if (options.useBackgroundColor) {
      color = options.backgroundColor;
      forecolor = options.foregroundColor;
    }
    return {
      margin: options.margin,
      float: 'left' as const,
      backgroundColor: color,
      color: forecolor,
      border: 'solid ' + options.borderSize + 'px ' + options.borderColor,
      width: '' + (width - 2 * options.margin * options.lightsPerLine) / options.lightsPerLine + 'px',
      borderRadius: '' + options.borderRadius + 'px',
    };
  };

  const mainStyleTrend = (index: number) => {
    return {
      textAlign: 'center' as const,
      fontSize: options.trendFontSize,
      backgroundColor: lastvals[index].color,
      color: 'white',
      marginLeft: options.borderRadius / 2,
      marginRight: options.borderRadius / 2,
    };
  };

  let lastvals: Array<{ lastVal: any; lastVal2: any; diff: any; color: string }>;
  lastvals = data.series
    .map((series) => series.fields.find((field) => field.type === 'number'))
    .map((field) => {
      let lastval = null;
      let lastval2 = null;
      let diff = null;
      let color = 'grey';
      if (field != null) {
        let clean = field.values.filter((e) => e != null);

        if (clean.length > 0) {
          lastval = clean[clean.length - 1];
        }
        if (clean.length - 1 > 0) {
          lastval2 = clean[clean.length - 2];
          diff = lastval2 - lastval;
          if (!(options.minimumAbsoluteChange > 0 && Math.abs(diff) < options.minimumAbsoluteChange)) {
            if (options.invertedScale) {
              if (diff >= 0) {
                color = 'green';
              } else if (diff < 0) {
                color = 'red';
              }
            } else {
              if (diff >= 0) {
                color = 'red';
              } else if (diff < 0) {
                color = 'green';
              }
            }
          }
        }
        return { lastVal: lastval, lastVal2: lastval2, diff: diff, color: color };
      }
      return { lastVal: lastval, lastVal2: lastval2, diff: diff, color: color };
    });

  return (
    <div
      style={{ overflow: 'auto' }}
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div>
        {serieNames.map((one, index) => {
          return (
            <div key={index} style={mainStyle(index)}>
              {options.showValue && (
                <div style={{ textAlign: 'center' as const, fontSize: options.valueFontSize }}>
                  {lastvals[index].lastVal} {options.showUnits ? options.units : ''}
                </div>
              )}
              {options.showTrend && (
                <div style={mainStyleTrend(index)}>
                  {lastvals[index].diff >= 0 ? '+' : ''}
                  {lastvals[index].diff}
                </div>
              )}

              <div style={{ textAlign: 'center', fontSize: options.nameFontSize }}>{one}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
