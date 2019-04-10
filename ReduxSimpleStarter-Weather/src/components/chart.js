import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

export default props => {
  return (
    <div>
      <Sparklines width={180} height={120} data={ props.data }>
        <SparklinesLine color={ props.color } />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{ average(props.data) } { props.unit }</div>
    </div>
  );
}

function average(data) {
  return Math.round(data.reduce((a, b) => a + b) / data.length);
}