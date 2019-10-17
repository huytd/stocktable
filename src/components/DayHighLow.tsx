import * as React from 'react';

export const DayHighLow = (props: {low: any; high: any; value: any;}) => {
  const low = props.low;
  const high = props.high;
  const value = props.value;
  const per = (value - low) * 100 / (high - low);
  return <div>
    <span>{low}</span>
    <progress className="w-20" value={per} max="100" />
    <span>{high}</span>
  </div>;
};

