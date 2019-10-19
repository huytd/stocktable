import * as React from 'react';
import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import Chart from "chart.js";
import { fetchHistory, COLORS } from '../utils';

type ChartSetting = {
  duration: string;
};

export const ReturnCalculator = (props: {symbols: any;}) => {
  const symbols = props.symbols;
  const [chartSetting, setChartSetting] = useState({
    duration: '10y',
    interval: '1mo',
    skipAxes: 120
  } as ChartSetting);
  const switchChartSetting = (label: string) => {
    switch (label) {
      case '1M':
        setChartSetting({
        duration: '1mo'
      });
      break;
      case '3M':
        setChartSetting({
        duration: '3mo'
      });
      break;
      case '6M':
        setChartSetting({
        duration: '6mo'
      });
      break;
      case '1Y':
        setChartSetting({
        duration: '1y'
      });
      break;
      case '5Y':
        setChartSetting({
        duration: '5y'
      });
      break;
      case '10Y':
        setChartSetting({
        duration: '10y'
      });
      break;
      case 'ALL':
        setChartSetting({
        duration: 'max'
      });
      break;
    }
  };
  const [chartData, setChartData] = useState({
    data: []
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (symbols) {
        const response = await Promise.all(symbols.map(async (s) => await fetchHistory(s, chartSetting.duration, '1mo')));
        const entries = response.map(r => {
          return r.chart.result[0].indicators.adjclose[0].adjclose;
        }).map(s => [ s.shift(), s.pop() ]);
        setChartData({
          data: entries
        })
      }
    })();
  }, [chartSetting]);

  useLayoutEffect(() => {
    if (chartData && chartData.data && chartData.data.length) {
      const canvas = canvasRef.current;
      var ctx = canvas.getContext('2d');
      var chart = new Chart(ctx, ReturnChartConfig(symbols, chartData.data));
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData]);

  return <div id="chart-container" className="w-full border-b pt-10 pb-2 px-5 flex flex-col relative">
    <canvas className="flex-1" ref={canvasRef} />
    <div className="p-3 mx-auto flex flex-row absolute top-0 right-0">
      <span className="bold mr-2">Estimated worth of $1000 invested in</span>
      <button onClick={() => {switchChartSetting('1M');}} className={`${chartSetting.duration === '1mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r rounded-l-lg px-2 py-1 hover:bg-gray-200`}>1M</button>
      <button onClick={() => {switchChartSetting('3M');}} className={`${chartSetting.duration === '3mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>3M</button>
      <button onClick={() => {switchChartSetting('6M');}} className={`${chartSetting.duration === '6mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>6M</button>
      <button onClick={() => {switchChartSetting('1Y');}} className={`${chartSetting.duration === '1y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>1Y</button>
      <button onClick={() => {switchChartSetting('5Y');}} className={`${chartSetting.duration === '5y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>5Y</button>
      <button onClick={() => {switchChartSetting('10Y');}} className={`${chartSetting.duration === '10y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>10Y</button>
      <button onClick={() => {switchChartSetting('ALL');}} className={`${chartSetting.duration === 'max' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs rounded-r-lg px-2 py-1 hover:bg-gray-200`}>ALL</button>
    </div>
  </div>;
};

const ReturnChartConfig = (symbols, entries) => {
  return {
    type: 'bar',
    // The data for our dataset
    data: {
      labels: [''],
      datasets: entries.map((e, i) => {
        const color = COLORS[i > COLORS.length ? i - (Math.random() * COLORS.length - 1) : i];
        const value = ((1000 / e[0]) * e[1]).toFixed(2);
        return {
          label: symbols[i],
          borderColor: color,
          backgroundColor: color,
          borderWidth: 2,
          data: [ parseFloat(value) ]
        }
      })
    },
    // Configuration options go here
    options: {
      maintainAspectRatio: false,
    }
  };
};
