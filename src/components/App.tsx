/**
 * TODO:
 * 1. Customizable Table
 * 2. Explorable Phase 1: Search stock with dropdown list
 * 3. Explorable Phase 2: List peers/competitors
 * 4. News matched companies
 * 5. More compact UI
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { TableConfig } from './TableConfig';
import { getParamSymbols, fetchStock, pathRead } from '../utils';
import { DisplayTable } from './DisplayTable';
import { HistoryChart } from './HistoryChart';

export const App = () => {
  const symbols = getParamSymbols();
  const [dataSource, setSource] = useState([]);

  useEffect(() => {
    (async () => {
      if (symbols.length) {
        const data = await Promise.all(symbols.map(async s => await fetchStock(s)));
        setSource(data);
      }
    })();
  }, []);

  return <div className="w-full h-full flex flex-col">
    <div className="flex-1">
      <HistoryChart symbols={symbols}/>
      <div className="px-5">
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="py-3"></td>
              {dataSource.map((s, i) => {
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
            <DisplayTable config={TableConfig} source={dataSource} />
          </tbody>
        </table>
      </div>
    </div>
  </div>;
};
