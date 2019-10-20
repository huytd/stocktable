import * as React from 'react';
import { useEffect, useState } from 'react';
import { getParamSymbols, fetchStock } from '../utils';
import { HistoryChart } from './HistoryChart';
import { ComparisonTable } from './ComparisonTable';
import {News} from './News';
import {ReturnCalculator} from './ReturnCalculator';
import {StockCalendar} from './StockCalendar';

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

  return <div className="w-full h-full">
    <div className="w-full flex">
      <input type="text" className="m-3 p-3 px-5 flex-1 rounded-full bg-gray-200" placeholder="Search for company or symbols..." />
    </div>
    <div className="flex flex-row">
      <div className="flex-1 border-r">
        <HistoryChart symbols={symbols}/>
        <ComparisonTable dataSource={dataSource}/>
      </div>
      <div className="w-1/3">
        <StockCalendar dataSource={dataSource}/>
        <ReturnCalculator symbols={symbols}/>
        <News symbols={symbols}/>
      </div>
    </div>
  </div>;
};
