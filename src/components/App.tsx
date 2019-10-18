/**
 * PRODUCT GOAL:
 * 1. A highly customizable stock evaluating tool
 * 2. Make it easy to explore peer/competitors stocks
 * 3. Not a stock screener/scanner
 * 4. Won't seek to replace Yahoo Finance or any related product
 * 5. Won't focus on trading-style stock strategies
 * TODO:
 * 1. Customizable Table
 * 2. Explorable Phase 1: Search stock with dropdown list
 * 3. Explorable Phase 2: List peers/competitors
 * 4. News matched companies
 * 5. More compact UI
 */

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getParamSymbols, fetchStock } from '../utils';
import { HistoryChart } from './HistoryChart';
import { ComparisonTable } from './ComparisonTable';

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
      <HistoryChart symbols={symbols}/>
      <ComparisonTable dataSource={dataSource}/>
  </div>;
};
