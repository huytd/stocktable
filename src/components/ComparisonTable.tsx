import * as React from 'react';
import { configExpression, findMaxIndex, pathRead } from '../utils';
import { TableConfig } from './TableConfig';

const DisplayTable = props => {
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

export const ComparisonTable = props => {
  return <div className="border-t border-b">
    <table className="w-full">
      <thead>
        <tr className="border-b sticky top-0 bg-gray-100">
          <td className="py-3"></td>
          {props.dataSource.map((s, i) => {
            const symbol = pathRead(s, 'price.symbol');
            const change = pathRead(s, 'price.regularMarketChangePercent.raw');
            const percent = pathRead(s, 'price.regularMarketChangePercent.fmt');
            const price = pathRead(s, 'price.regularMarketPrice.raw');
            const name = pathRead(s, 'price.shortName');
            return <td key={i} className="py-3">
              <h1 className="font-bold mr-2">{symbol}</h1>
              <div className="block">{name}</div>
              <h2 className="inline-block text-gray-800 mr-2">{price}</h2>
              <h2 className={`inline-block ${change > 0 ? 'text-green-600' : 'text-tomato-600'}`}>{percent}</h2>
            </td>;
          })}
        </tr>
      </thead>
      <tbody>
        <DisplayTable config={TableConfig} source={props.dataSource} />
      </tbody>
    </table>
  </div>;
};
