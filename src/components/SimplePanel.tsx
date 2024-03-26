import React from 'react';
import 'components/SimplePanel.css';
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

  const computeTrend = (one: any) => {
    let val = one.diff;
    if (options.showTrendAsPercentage) {
      let diff2=one.lastVal - one.lastVal2;
      let sign=''
      if (one.diff > 0) {
        sign = '+';
      }  
      return sign+(((diff2) / one.lastVal2) * 100).toFixed(options.showTrendDigits) + ' %';
    }
    let sign = '';
    if (one.diff > 0) {
      sign = '+';
    }
    return sign + val?.toFixed(options.showTrendDigits);
  };

  const computeWidth = (percent: number) => {
    return '' + ((width - 2 * options.margin * options.lightsPerLine) / options.lightsPerLine) * percent + 'px';
  };

  const mainStyle = (index: number) => {
    let color = lastvals[index].color;

    let forecolor = theme.colors.text.primary; //'white';

    if (options.graphType !== 'background') {
      color = '#00000000';
    }
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
      width: computeWidth(1),
      borderRadius: '' + options.borderRadius + 'px',
    };
  };

  const computeTrafficColor = (index: number, trafficIndex: number) => {
    if (trafficIndex === lastvals[index].colorIndex) {
      if (trafficIndex === 0) {
        return 'red';
      } else if (trafficIndex === 1) {
        return 'orange';
      } else {
        return 'green';
      }
    }
    return 'black';
  };

  const mainStyleTrend = (index: number) => {
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      textAlign: 'center' as const,
      fontSize: options.trendFontSize,
      backgroundColor: lastvals[index].color,
      color: 'white',
      marginLeft: options.borderRadius / 2,
      marginRight: options.borderRadius / 2,
    };
  };

  let lastvals: Array<{ lastVal: any; lastVal2: any; diff: any; color: string; colorIndex: number; name: string }>;
  lastvals = data.series
    .map((series) => series.fields.find((field) => field.type === 'number'))
    .map((field) => {
      let lastval = null;
      let lastval2 = null;
      let diff = null;
      let color = 'grey';
      let colorindex = 1;
      if (field != null) {
        let clean = field.values.filter((e) => e != null);

        if (clean.length > 0) {
          lastval = clean[clean.length - 1];
        }
        if (options.meterType === 'diff' || options.showTrend) {
          if (clean.length - 1 > 0) {
            lastval2 = clean[clean.length - 2];
            diff = lastval - lastval2;
            if (options.showTrendAsPercentage) {
              diff = ((lastval - lastval2) / lastval2) * 100;
            }
            if (!(options.minimumAbsoluteChange > 0 && Math.abs(diff) < options.minimumAbsoluteChange)) {
              if (options.invertedScale) {
                if (diff >= 0) {
                  color = 'green';
                  colorindex = 2;
                } else if (diff < 0) {
                  color = 'red';
                  colorindex = 0;
                }
              } else {
                if (diff >= 0) {
                  color = 'red';
                  colorindex = 0;
                } else if (diff < 0) {
                  color = 'green';
                  colorindex = 2;
                }
              }
            }
          }
        } else {
          if (options.invertedScale) {
            if (lastval >= options.thresholdMaxValue) {
              color = 'green';
              colorindex = 2;
            } else if (lastval <= options.thresholdMinValue) {
              color = 'red';
              colorindex = 0;
            }
          } else {
            if (lastval >= options.thresholdMaxValue) {
              color = 'red';
              colorindex = 0;
            } else if (lastval <= options.thresholdMinValue) {
              color = 'green';
              colorindex = 2;
            }
          }
        }
        return { lastVal: lastval, lastVal2: lastval2, diff: diff, color: color, colorIndex: colorindex, name: '' };
      }
      return { lastVal: lastval, lastVal2: lastval2, diff: diff, color: color, colorIndex: colorindex, name: '' };
    });

  let i = 0;
  for (let s of serieNames) {
    lastvals[i].name = s;
    i++;
  }

  if (options.sortByDiff && options.meterType === 'diff') {
    lastvals.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  }

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
        {lastvals.map((one, index) => {
          return (
            <div key={index} style={mainStyle(index)} title={'Current:' + one.lastVal + ' Previous:' + one.lastVal2}>
              {options.showValue && !(options.showValueAsOverlay && options.graphType === 'svg') && (
                <div
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'center' as const,
                    fontSize: options.valueFontSize,
                  }}
                >
                  {one.lastVal?.toFixed(options.showValueDigits)} {options.showUnits ? options.units : ''}
                </div>
              )}
              {options.graphType === 'svg' && (
                <div style={{ width: '100%', textAlign: 'center', position: 'relative' }}>
                  <svg viewBox={options.svgViewBox} className="" width={computeWidth(0.7)} height={computeWidth(0.7)}>
                    <g stroke={one.color} fill={one.color}>
                      <path d={options.svgIcon}></path>
                    </g>
                  </svg>
                  {options.showValueAsOverlay && options.graphType === 'svg' && options.showValue && (
                    <div
                      style={{
                        position: 'absolute' as const,
                        width: '100%',
                        top: '0px',
                        bottom: '0px',
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: '0.9',
                      }}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          backgroundColor: one.color,
                          color: 'white',
                          paddingLeft: '5px',
                          paddingRight: '5px',
                          fontSize: options.valueFontSize,
                        }}
                      >
                        {one.lastVal?.toFixed(options.showValueDigits)} {options.showUnits ? options.units : ''}
                      </span>
                    </div>
                  )}
                </div>
              )}
              {options.graphType === 'traffic' && (
                <div className="traffic-light-vis">
                  <div className="traffic-light-box">
                    <div
                      className="traffic-light-container"
                      style={{
                        marginLeft: computeWidth(0.4),
                        width: computeWidth(0.2),
                        height: computeWidth(2.68 * 0.2),
                      }}
                    >
                      <div className="traffic-light">
                        <div className="light" style={{ backgroundColor: computeTrafficColor(index, 0) }}></div>
                        <div className="light" style={{ backgroundColor: computeTrafficColor(index, 1) }}></div>
                        <div className="light" style={{ backgroundColor: computeTrafficColor(index, 2) }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {options.showTrend && <div style={mainStyleTrend(index)}>{computeTrend(one)}</div>}

              <div
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textAlign: 'center',
                  fontSize: options.nameFontSize,
                }}
              >
                {one.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
