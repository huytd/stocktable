import * as React from 'react';
import { configExpression, findMaxIndex } from '../utils';

export const DisplayTable = props => {
  const config = props.config;
  const source = props.source;
  return config.map(( field, fidx ) => {
    if (field.header) {
      return <tr key={fidx} className="bg-gray-300">
        <td className="p-2 px-3 font-bold" colSpan={source.length + 1}>{field.header}</td>
      </tr>;
    }
    else {
      const values = source.map(s => configExpression(s, field.path));
      const maxIndex = field.compare ? findMaxIndex(values) : -1;
      return <tr key={fidx} className="hover:bg-gray-100">
        <td className="py-3 pl-3 text-gray-700">{field.text}</td>
        {source.map((_, i) => <td key={i} className={`py-3 ${i === maxIndex ? 'font-bold' : ''}`}>{values[i]}</td>)}
      </tr>;
    }
  });
};

