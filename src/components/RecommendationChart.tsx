import * as React from 'react';
import Chart from "chart.js";
import {useRef, useLayoutEffect} from 'react';
import {pathRead} from '../utils';

const RECOMMEND_COLORS = ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'];

export const RecommendationChart = props => {
  const trends = props.dataSource.map((s, i) => {
    const symbol = pathRead(s, 'price.symbol');
    const trend = s.recommendationTrend && s.recommendationTrend.trend.shift();
    return {
      symbol: symbol,
      trend: [trend.strongSell, trend.sell, trend.hold, trend.buy, trend.strongBuy]
    }
  });

  const canvasRef = useRef(null);

  useLayoutEffect(() => {
    var chart = null;
    if (trends && trends.length) {
      const canvas = canvasRef.current;
      var ctx = canvas.getContext('2d');
      chart = new Chart(ctx, RecommendationChartConfig(trends));
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    }
  }, [trends]);

  return <div id="chart-container" className="w-full border-b p-3 pb-10 flex flex-col relative">
    <div className="font-bold mb-3">Recommendation Trend:</div>
    <canvas className="flex-1" ref={canvasRef} />
  </div>;
};

const RecommendationChartConfig = (trends): Chart.ChartConfiguration => {
  const trendLine = ['Strong Sell', 'Sell', 'Hold', 'Buy', 'Strong Buy'];

  const chartData = {
    labels: trends.map(t => t.symbol),
    datasets: trendLine.map(( act, i ) => {
      return {
        label: act,
        backgroundColor: RECOMMEND_COLORS[i],
        data: trends.map(t => t.trend[i])
      }
    })
  };

  return {
    type: 'bar',
    data: chartData,
    options: {
      maintainAspectRatio: false,
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12
        }
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    }
  };
};
