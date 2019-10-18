/**
 * PRODUCT GOAL:
 * 1. A highly customizable stock evaluating tool
 * 2. A tool to easily compare and explore peer/competitors stocks
 * 3. Visualize everything with Charts
 * 4. Not a stock screener/scanner
 * 5. Won't seek to replace Yahoo Finance or any related product
 * 6. Won't focus on trading-style stock strategies
 * TODO:
 * 1. Customizable Table
 * 2. Explorable Phase 1: Search stock with dropdown list
 * 3. Explorable Phase 2: List peers/competitors
 * 4. More compact UI
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getParamSymbols, fetchStock } from '../utils';
import { HistoryChart } from './HistoryChart';
import { ComparisonTable } from './ComparisonTable';
import {News} from './News';

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
      <div className="flex-1">
        <News symbols={symbols}/>
      </div>
    </div>
  </div>;
};
