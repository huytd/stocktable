import * as React from 'react';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import Chart from "chart.js";
import { fetchHistory, COLORS } from '../utils';

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = '#07C';
         ctx.stroke();
         ctx.restore();
      }
   }
});

type ChartSetting = {
  duration: string;
  interval: string;
  skipAxes: number;
};

export const HistoryChart = (props: {symbols: any;}) => {
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
          duration: '1mo',
          interval: '1d',
          skipAxes: 30
        });
        break;
      case '3M':
        setChartSetting({
          duration: '3mo',
          interval: '1d',
          skipAxes: 60
        });
        break;
      case '6M':
        setChartSetting({
          duration: '6mo',
          interval: '5d',
          skipAxes: 60
        });
        break;
      case '1Y':
        setChartSetting({
          duration: '1y',
          interval: '5d',
          skipAxes: 12
        });
        break;
      case '5Y':
        setChartSetting({
          duration: '5y',
          interval: '1mo',
          skipAxes: 60
        });
        break;
      case '10Y':
        setChartSetting({
          duration: '10y',
          interval: '1mo',
          skipAxes: 120
        });
        break;
      case 'ALL':
        setChartSetting({
          duration: 'max',
          interval: '3mo',
          skipAxes: 120
        });
        break;
    }
  };
  const [chartData, setChartData] = useState({
    labels: [],
    data: []
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (symbols) {
        const response = await Promise.all(symbols.map(async (s) => await fetchHistory(s, chartSetting.duration, chartSetting.interval)));
        const timestamps = response[0].chart.result[0].timestamp.map(t => {
          const parsed = new Date(t * 1000);
          const day = `${parsed.getDay() + 1}`.padStart(2, '0');
          const month = `${parsed.getMonth() + 1}`.padStart(2, '0');
          return `${day}-${month}-${parsed.getFullYear()}`;
        });
        const entries = response.map(r => {
          const hist = r.chart.result[0].indicators.adjclose[0].adjclose;
          const base = hist[0];
          return hist.map(i => +(((i - base) / base) * 100).toFixed(2));
        });
        setChartData({
          labels: timestamps,
          data: entries
        });
      }
    })();
  }, [chartSetting]);

  useLayoutEffect(() => {
    if (chartData && chartData.data && chartData.data.length) {
      const canvas = canvasRef.current;
      var ctx = canvas.getContext('2d');
      var chart = new Chart(ctx, HistoryChartConfig(chartData, symbols, chartSetting));
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartData]);
  return <div id="chart-container" className="w-full pt-10 px-5 flex flex-col relative">
    <div className="p-3 mx-auto flex flex-row absolute top-0 left-0">
      <button onClick={() => {switchChartSetting('1M');}} className={`${chartSetting.duration === '1mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r rounded-l-lg px-2 py-1 hover:bg-gray-200`}>1M</button>
      <button onClick={() => {switchChartSetting('3M');}} className={`${chartSetting.duration === '3mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>3M</button>
      <button onClick={() => {switchChartSetting('6M');}} className={`${chartSetting.duration === '6mo' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>6M</button>
      <button onClick={() => {switchChartSetting('1Y');}} className={`${chartSetting.duration === '1y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>1Y</button>
      <button onClick={() => {switchChartSetting('5Y');}} className={`${chartSetting.duration === '5y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>5Y</button>
      <button onClick={() => {switchChartSetting('10Y');}} className={`${chartSetting.duration === '10y' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs border-gray-400 border-r px-2 py-1 hover:bg-gray-200`}>10Y</button>
      <button onClick={() => {switchChartSetting('ALL');}} className={`${chartSetting.duration === 'max' ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-900'} text-xs rounded-r-lg px-2 py-1 hover:bg-gray-200`}>ALL</button>
    </div>
    <canvas className="flex-1" ref={canvasRef} />
  </div>;
};

const HistoryChartConfig = (chartData: {labels: any[]; data: any[];}, symbols: string[], chartSetting: ChartSetting): Chart.ChartConfiguration => {
  return {
    type: 'LineWithLine',
    // The data for our dataset
    data: {
      labels: chartData.labels,
      datasets: chartData.data.map((c, i) => ({
        label: symbols[i],
        fill: false,
        borderColor: COLORS[i > COLORS.length ? i - (Math.random() * COLORS.length - 1) : i],
        borderWidth: 3,
        lineTension: 0,
        pointRadius: 0,
        pointHitRadius: 10,
        data: c
      }))
    },
    // Configuration options go here
    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.6)',
        titleFontFamily: 'monospace',
        bodyFontFamily: 'monospace',
        caretSize: 5,
        cornerRadius: 4,
        xPadding: 10,
        yPadding: 10,
        callbacks: {
          title: (item, data) => {
            return `${data.labels[item[0].index]}`;
          },
          label: (item, data) => {
            const dataset = data.datasets[item.datasetIndex];
            const value = dataset.data[item.index];
            const label = dataset.label.padEnd(4, ' ');
            return `${label} ${value}%`;
          },
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              minRotation: 90,
              maxRotation: 90,
              autoSkip: true,
              maxTicksLimit: chartSetting.skipAxes,
              callback: (value) => {
                const parts = value.split('-');
                return `${parts[1]}-${parts[2]}`;
              }
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              callback: (value) => `${value}%`,
              autoSkip: true,
              maxTicksLimit: 8
            },
            gridLines: {
              display: true,
              borderDash: [8, 4],
              color: '#eee',
              drawBorder: false,
            }
          }
        ]
      },
      legend: {
        labels: {
          boxWidth: 12
        }
      },
    }
  };
};
