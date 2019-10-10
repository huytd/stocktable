import * as React from 'react';
import {useEffect, useState} from 'react';

const tableConfig = [
  // PRICE
  {
    header: 'Pricing',
  },
  {
    text: 'Day Low/High',
    path: function(source) {
      const low = pathRead(source, 'summaryDetail.dayLow.raw');
      const high = pathRead(source, 'summaryDetail.dayHigh.raw');
      const value = pathRead(source, 'financialData.currentPrice.raw');
      return <DayLH low={low} high={high} value={value} />;
    }
  },
  {
    text: 'Previous Close',
    path: 'summaryDetail.previousClose.fmt'
  },
  {
    text: 'Open',
    path: 'summaryDetail.open.fmt'
  },
  {
    text: '50 Days Average',
    path: 'summaryDetail.fiftyDayAverage.fmt'
  },
  {
    text: '200 Days Average',
    path: 'summaryDetail.twoHundredDayAverage.fmt'
  },
  {
    text: 'Average Daily Volume 10 Days',
    path: 'price.averageDailyVolume10Day.fmt'
  },
  {
    text: 'Average Daily Volume 3 Months',
    path: 'price.averageDailyVolume3Month.fmt'
  },
  // KEYS
  {
    header: 'Key Statistics',
  },
  {
    text: 'Market Cap.',
    path: 'price.marketCap.fmt'
  },
  {
    text: '52-Week Range',
    path: ['summaryDetail.fiftyTwoWeekLow.fmt', '-', 'summaryDetail.fiftyTwoWeekHigh.fmt']
  },
  {
    text: 'Shares Outstanding',
    path: 'defaultKeyStatistics.sharesOutstanding.fmt'
  },
  // DIVIDEND
  {
    header: 'Dividend'
  },
  {
    text: 'Dividend Yield',
    path: 'summaryDetail.dividendYield.fmt'
  },
  {
    text: 'Dividend Rate',
    path: 'summaryDetail.dividendRate.fmt'
  },
  {
    text: 'Dividend Date',
    path: 'calendarEvents.dividendDate.fmt'
  },
  {
    text: 'Payout Ratio',
    path: 'summaryDetail.payoutRatio.fmt'
  },
  // FINANCIAL
  {
    header: 'Financial'
  },
  {
    text: 'Total Revenue',
    path: 'financialData.totalRevenue.fmt'
  },
  {
    text: 'Revenue Per Share',
    path: 'financialData.revenuePerShare.fmt'
  },
  {
    text: 'Profit Margin',
    path: 'financialData.profitMargins.fmt'
  },
  {
    text: 'Operating Margin',
    path: 'financialData.operatingMargins.fmt'
  },
    {
    text: 'Total Debt',
    path: 'financialData.totalDebt.fmt'
  },
  {
    text: 'Debt To Equity',
    path: 'financialData.debtToEquity.fmt'
  },
  // GROWTH
  {
    header: 'Growth'
  },
  {
    text: 'Trailing P/E',
    path: 'summaryDetail.trailingPE.fmt'
  },
  {
    text: 'Forward P/E',
    path: 'summaryDetail.forwardPE.fmt'
  },
  {
    text: 'Trailing EPS',
    path: 'defaultKeyStatistics.trailingEps.fmt'
  },
  {
    text: 'Forward EPS',
    path: 'defaultKeyStatistics.forwardEps.fmt'
  },
  {
    text: 'Current Qtr. Growth',
    path: 'earningsTrend.trend.0.growth.fmt'
  },
  {
    text: 'Next Qtr. Growth Estimate',
    path: 'earningsTrend.trend.1.growth.fmt'
  },
  {
    text: 'Earning Growth',
    path: 'financialData.earningsGrowth.fmt'
  },
  {
    text: 'Revenue Growth',
    path: 'financialData.revenueGrowth.fmt'
  },
  // INCOME STATEMENT
  {
    header: 'Last Income Statement'
  },
  {
    text: 'Date',
    path: 'incomeStatementHistory.incomeStatementHistory.0.endDate.fmt'
  },
  {
    text: 'Total Revenue',
    path: 'incomeStatementHistory.incomeStatementHistory.0.totalRevenue.fmt'
  },
  {
    text: 'Cost of Revenue',
    path: 'incomeStatementHistory.incomeStatementHistory.0.costOfRevenue.fmt'
  },
  {
    text: 'Gross Profit',
    path: 'incomeStatementHistory.incomeStatementHistory.0.grossProfit.fmt'
  },
  {
    text: 'Total Operating Expenses',
    path: 'incomeStatementHistory.incomeStatementHistory.0.totalOperatingExpenses.fmt'
  },
  {
    text: 'Operating Income',
    path: 'incomeStatementHistory.incomeStatementHistory.0.totalOperatingExpenses.fmt'
  },
  {
    text: 'Other Income & Expenses',
    path: 'incomeStatementHistory.incomeStatementHistory.0.totalOtherIncomeExpenseNet.fmt'
  },
  {
    text: 'Income Before Taxes',
    path: 'incomeStatementHistory.incomeStatementHistory.0.incomeBeforeTax.fmt'
  },
  {
    text: 'Income Tax Expense',
    path: 'incomeStatementHistory.incomeStatementHistory.0.incomeTaxExpense.fmt'
  },
  {
    text: 'Net Income',
    path: 'incomeStatementHistory.incomeStatementHistory.0.netIncome.fmt'
  },
  {
    text: 'Net Income Applicable To Common Shares',
    path: 'incomeStatementHistory.incomeStatementHistory.0.netIncomeApplicableToCommonShares.fmt'
  }
];

const pathRead = (obj, path) => {
  let paths = path.split('.')
    , current = obj
    , i;

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
};

const configExpression = ( source, path ) => {
  if (typeof path === "function") {
    return path(source);
  }
  if (typeof path === "string") {
    if (path !== '-') {
      return pathRead(source, path);
    } else {
      return '-';
    }
  }
  if (Array.isArray(path)) {
    return path.map(p => configExpression(source, p)).join(' ');
  }
  return "N/A";
};

const saveCache = (symbol, data) => {
  window.localStorage.setItem(symbol, JSON.stringify({
    lastSaved: Date.now(),
    data: data
  }));
};

const getCache = symbol => {
  const cacheData = window.localStorage.getItem(symbol);
  if (cacheData) {
    const parsed = JSON.parse(cacheData);
    if (Date.now() - parsed.lastSaved <= 5 * 60 * 1000) {
      return parsed.data;
    }
  }
  return -1;
};

const fetchStock = async symbol => {
  let cached = getCache(symbol);
  if (cached === -1) {
    const cors = `https://cors-anywhere.herokuapp.com/`;
    const url = `${cors}https://query2.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=assetProfile,balanceSheetHistory,balanceSheetHistoryQuarterly,calendarEvents,cashflowStatementHistory,cashflowStatementHistoryQuarterly,defaultKeyStatistics,earnings,earningsHistory,earningsTrend,financialData,fundOwnership,incomeStatementHistory,incomeStatementHistoryQuarterly,indexTrend,industryTrend,insiderHolders,insiderTransactions,institutionOwnership,majorDirectHolders,majorHoldersBreakdown,netSharePurchaseActivity,price,quoteType,recommendationTrend,secFilings,sectorTrend,summaryDetail,summaryProfile,symbol,upgradeDowngradeHistory,fundProfile,topHoldings,fundPerformance`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json.quoteSummary && json.quoteSummary.result && json.quoteSummary.result[0]) {
      cached = json.quoteSummary.result[0];
      saveCache(symbol, cached);
    }
  }
  return cached;
};

const Chart = (props) => {
  console.log('>>>>>', props.symbols)
  useEffect(() => {
    new TradingView.MediumWidget({
      "container_id": "tv-medium-widget",
      "symbols": props.symbols,
      "greyText": "Quotes by",
      "gridLineColor": "#e9e9ea",
      "fontColor": "#83888D",
      "underLineColor": "#dbeffb",
      "trendLineColor": "#4bafe9",
      "width": "100%",
      "height": "300px",
      "locale": "en"
    })
  }, [props.symbols]);

  return <div className="tradingview-widget-container">
    <div id="tv-medium-widget"></div>
  </div>
};

const DayLH = (props) => {
  const low = props.low;
  const high = props.high;
  const value = props.value;
  const per = (value - low) * 100 / (high - low);
  return <div>
    <span>{low}</span>
    <progress className="w-20" value={per} max="100" />
    <span>{high}</span>
  </div>
};

const DisplayTable = props => {
  const config = props.config;
  const source = props.source;
  return config.map(field => {
    if (field.header) {
      return <tr className="bg-gray-300">
        <td className="p-2 px-3 font-bold" colSpan={source.length+1}>{field.header}</td>
      </tr>;
    } else {
      return <tr className="hover:bg-gray-100">
        <td className="py-3 pl-3 text-gray-600">{field.text}</td>
        {source.map(s => <td className="py-3">{configExpression(s, field.path)}</td>)}
      </tr>;
    }
  });
};

export const App = () => {
  const [dataSource, setSource] = useState([]);
  const [chartSymbols, setChartSymbols] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const symbols = (urlParams.get('symbols') || "").split(",");
    (async () => {
      if (symbols.length) {
        const data = await Promise.all(symbols.map(async s => await fetchStock(s)));
        const chartSymbolParsed = data.map(s => {
          const exchangeName = pathRead(s, 'price.exchangeName');
          const symbol = pathRead(s, 'price.symbol');
          if (exchangeName.match(/nasdaq/i)) {
            return `NASDAQ:${symbol}`;
          }
          else {
            return `${exchangeName}:${symbol}`
          }
        });
        setChartSymbols(chartSymbolParsed);
        setSource(data);
      }
    })();
  }, []);

  return <div className="w-full h-full flex flex-col">
    <div className="flex-1">
      <Chart symbols={chartSymbols}/>
      <div className="px-5">
        <table className="w-full">
          <tr className="border-b">
            <td className="py-3"></td>
            {dataSource.map(s => {
              const symbol = pathRead(s, 'price.symbol');
              const change = pathRead(s, 'price.regularMarketChangePercent.raw');
              const percent = pathRead(s, 'price.regularMarketChangePercent.fmt');
              const price = pathRead(s, 'price.regularMarketPrice.raw');
              const name = pathRead(s, 'price.shortName');
              return <td className="py-3">
                <h1 className="font-bold mr-2">{symbol}</h1>
                <div className="block">{name}</div>
                <h2 className="inline-block text-gray-800 mr-2">{price}</h2>
                <h2 className={`inline-block ${change > 0 ? 'text-green-600' : 'text-tomato-600'}`}>{percent}</h2>
              </td>;
            })}
          </tr>
          <DisplayTable config={tableConfig} source={dataSource} />
        </table>
      </div>
    </div>
  </div>;
};
