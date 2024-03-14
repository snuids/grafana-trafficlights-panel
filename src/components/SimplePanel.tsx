import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

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
  //const theme = useTheme2();
  const styles = useStyles2(getStyles);
  
  let serieNames=data.series.map(s => s.name);

  

  let lastvals: Array<{lastVal:any,lastVal2:any,diff:any,color:string}> ;
  lastvals= data.series
    .map(series => series.fields.find(field => field.type === 'number'))
    .map(field => {
      let lastval=null;
        let lastval2=null;
        let diff=null;
        let color='grey'
      if (field!=null)
      {
        let clean=field.values.filter(e => e!=null)
        
        if (clean.length >0){
          lastval=clean[clean.length - 1]
        }
        if (clean.length - 1>0){
          lastval2=clean[clean.length - 2]
          diff=lastval2-lastval
          if (diff>=0)
            color="green"
          else if (diff<0)
            color="red"

        }
        return {"lastVal":lastval,"lastVal2":lastval2,"diff":diff,"color":color}
        ;
      }
      return {"lastVal":lastval,"lastVal2":lastval2,"diff":diff,"color":color}
    }
    );

  return (
    <div style={{overflow:"auto"}}
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <div>
      {serieNames.map((one, index)=>{
        return <div style={{float:"left",backgroundColor:lastvals[index].color,border:"solid 1px black",width:(width/options.lightsPerLine)}}>
        { options.showValue && <div style={{"textAlign":"center","fontSize":options.valueFontSize}}>{lastvals[index].lastVal}</div>}
        { options.showTrend && <div style={{"textAlign":"center","fontSize":options.trendFontSize}}>{lastvals[index].diff>=0?"+":""}{lastvals[index].diff}</div>}

        <div style={{"textAlign":"center","fontSize":options.fontSize}}>
          {one}
        </div>
        </div>
      }
      )}
      </div>
      
      
      
//       {/* <svg
//   className={styles.svg}
//   width={width}
//   height={height}
//   xmlns="http://www.w3.org/2000/svg"
//   xmlnsXlink="http://www.w3.org/1999/xlink"
//   viewBox={`0 -${height / 2} ${width} ${height}`}
// >
//   <g fill="orange">
//     {radii.map((radius, index) => {
//       const step = width / radii.length;
//       return <circle r={radius} transform={`translate(${index * step + step / 2}, 0)`} />;
//     })}
//   </g>
// </svg> */}

      <div className={styles.textBox}>
        Width:{options.width}
        Tota:{options.lightsPerLine}        
        <div>Text option value AMA3: {options.text}</div>
      </div>
    </div>
  );
};
