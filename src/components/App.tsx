/**
 * TODO:
 * 1. Make chart looks more cleaner and meaningful
 * 2. Customizable Table
 * 3. Provide more metrics
 * 4. Chart should have more range: 10Y, 5Y, 1Y, 6MO, 3MO,...
 * 5. Explorable Phase 1: Search stock with dropdown list
 * 6. Explorable Phase 2: List peers/competitors
 */

import * as React from 'react';
import {useEffect, useState, useRef, useLayoutEffect} from 'react';
import Chart from "chart.js";

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

const COLORS = ['#f81b02', '#fc7715', '#afbf41', '#50c49f', '#3b95c4', '#b560d4'];

const cors = `https://snackycors.herokuapp.com/`;

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
    path: 'summaryDetail.previousClose.fmt',
    compare: true
  },
  {
    text: 'Open',
    path: 'summaryDetail.open.fmt',
    compare: true
  },
  {
    text: '50 Days Average',
    path: 'summaryDetail.fiftyDayAverage.fmt',
    compare: true
  },
  {
    text: '200 Days Average',
    path: 'summaryDetail.twoHundredDayAverage.fmt',
    compare: true
  },
  {
    text: 'Average Daily Volume 10 Days',
    path: 'price.averageDailyVolume10Day.fmt',
    compare: true
  },
  {
    text: 'Average Daily Volume 3 Months',
    path: 'price.averageDailyVolume3Month.fmt',
    compare: true
  },
  {
    text: 'Pre-Market Change Percent',
    path: 'price.preMarketChangePercent.fmt',
    compare: true
  },
  // PRICE DETAIL
  {
    header: 'Pricing Detail',
  },
  {
    text: 'Pre-Market Change',
    path: 'price.preMarketChange.fmt',
    compare: true
  },
  {
    text: 'Pre-Market Price',
    path: 'price.preMarketPrice.fmt',
    compare: true
  },
  {
    text: 'Post-Market Change Percent',
    path: 'price.postMarketChangePercent.fmt',
    compare: true
  },
  {
    text: 'Post-Market Change',
    path: 'price.postMarketChange.fmt',
    compare: true
  },
  {
    text: 'Post-Market Price',
    path: 'price.postMarketPrice.fmt',
    compare: true
  },
  {
    text: 'Post-Market Price',
    path: 'price.postMarketPrice.fmt',
    compare: true
  },
  {
    text: 'Regular Market Change Percent',
    path: 'price.regularMarketChangePercent.fmt',
    compare: true
  },
  {
    text: 'Regular Market Change',
    path: 'price.regularMarketChange.fmt',
    compare: true
  },
  {
    text: 'Regular Market Price',
    path: 'price.regularMarketPrice.fmt',
    compare: true
  },
  {
    text: 'Regular Market High',
    path: 'price.regularMarketDayHigh.fmt',
    compare: true
  },
  {
    text: 'Regular Market Low',
    path: 'price.regularMarketDayLow.fmt',
    compare: true
  },
  {
    text: 'Regular Market Volume',
    path: 'price.regularMarketVolume.fmt',
    compare: true
  },
  {
    text: 'Regular Market Previous Open',
    path: 'price.regularMarketOpen.fmt',
    compare: true
  },
  {
    text: 'Regular Market Previous Close',
    path: 'price.regularMarketPreviousClose.fmt',
    compare: true
  },
  // FINANCIAL DATA
  {
    header: 'Financial Data',
  },
  {
    text: 'Price',
    path: 'financialData.currentPrice.fmt',
    compare: true
  },
  {
    text: 'High Price',
    path: 'financialData.targetHighPrice.fmt',
    compare: true
  },
  {
    text: 'Low Price',
    path: 'financialData.targetLowPrice.fmt',
    compare: true
  },
  {
    text: 'Mean Price',
    path: 'financialData.targetMeanPrice.fmt',
    compare: true
  },
  {
    text: 'Median Price',
    path: 'financialData.targetMedianPrice.fmt',
    compare: true
  },
  {
    text: 'Total Cash',
    path: 'financialData.totalCash.fmt',
    compare: true
  },
  {
    text: 'Total Cash Per Share',
    path: 'financialData.totalCashPerShare.fmt',
    compare: true
  },
  {
    text: 'Ebitda',
    path: 'financialData.ebitda.fmt',
    compare: true
  },
  {
    text: 'Total Debt',
    path: 'financialData.totalDebt.fmt',
    compare: true
  },
  {
    text: 'Quick Ratio',
    path: 'financialData.quickRatio.fmt',
    compare: true
  },
  {
    text: 'Current Ratio',
    path: 'financialData.currentRatio.fmt',
    compare: true
  },
  {
    text: 'Total Revenue',
    path: 'financialData.totalRevenue.fmt',
    compare: true
  },
  {
    text: 'Debt Equity',
    path: 'financialData.debtToEquity.fmt',
    compare: true
  },
  {
    text: 'Revenue Per Share',
    path: 'financialData.revenuePerShare.fmt',
    compare: true
  },
  {
    text: 'Return On Assets',
    path: 'financialData.returnOnAssets.fmt',
    compare: true
  },
  {
    text: 'Return On Equity',
    path: 'financialData.returnOnEquity.fmt',
    compare: true
  },
  {
    text: 'Gross Profits',
    path: 'financialData.grossProfits.fmt',
    compare: true
  },
  {
    text: 'Free Cashflow',
    path: 'financialData.freeCashflow.fmt',
    compare: true
  },
  {
    text: 'Operating Cashflow',
    path: 'financialData.operatingCashflow.fmt',
    compare: true
  },
  {
    text: 'Operating Cashflow',
    path: 'financialData.operatingCashflow.fmt',
    compare: true
  },
  {
    text: 'Revenue Growth',
    path: 'financialData.revenueGrowth.fmt',
    compare: true
  },
  {
    text: 'Gross Margins',
    path: 'financialData.grossMargins.fmt',
    compare: true
  },
  {
    text: 'Ebitda Margins',
    path: 'financialData.ebitdaMargins.fmt',
    compare: true
  },
  {
    text: 'Operating Margins',
    path: 'financialData.operatingMargins.fmt',
    compare: true
  },
  {
    text: 'Profit Margins',
    path: 'financialData.profitMargins.fmt',
    compare: true
  },

  // KEYS
  {
    header: 'Key Statistics',
  },
  {
    text: 'Market Cap.',
    path: 'price.marketCap.fmt',
    compare: true
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
    path: 'summaryDetail.dividendYield.fmt',
    compare: true
  },
  {
    text: 'Dividend Rate',
    path: 'summaryDetail.dividendRate.fmt',
    compare: true
  },
  {
    text: 'Dividend Date',
    path: 'calendarEvents.dividendDate.fmt'
  },
  {
    text: 'Payout Ratio',
    path: 'summaryDetail.payoutRatio.fmt',
    compare: true
  },
  // FINANCIAL
  {
    header: 'Financial'
  },
  {
    text: 'Total Revenue',
    path: 'financialData.totalRevenue.fmt',
    compare: true
  },
  {
    text: 'Revenue Per Share',
    path: 'financialData.revenuePerShare.fmt',
    compare: true
  },
  {
    text: 'Profit Margin',
    path: 'financialData.profitMargins.fmt',
    compare: true
  },
  {
    text: 'Operating Margin',
    path: 'financialData.operatingMargins.fmt',
    compare: true
  },
    {
    text: 'Total Debt',
    path: 'financialData.totalDebt.fmt',
    compare: true
  },
  {
    text: 'Debt To Equity',
    path: 'financialData.debtToEquity.fmt',
    compare: true
  },
  // GROWTH
  {
    header: 'Growth'
  },
  {
    text: 'Trailing P/E',
    path: 'summaryDetail.trailingPE.fmt',
    compare: true
  },
  {
    text: 'Forward P/E',
    path: 'summaryDetail.forwardPE.fmt',
    compare: true
  },
  {
    text: 'Trailing EPS',
    path: 'defaultKeyStatistics.trailingEps.fmt',
    compare: true
  },
  {
    text: 'Forward EPS',
    path: 'defaultKeyStatistics.forwardEps.fmt',
    compare: true
  },
  {
    text: 'Current Qtr. Growth',
    path: 'earningsTrend.trend.0.growth.fmt',
    compare: true
  },
  {
    text: 'Next Qtr. Growth Estimate',
    path: 'earningsTrend.trend.1.growth.fmt',
    compare: true
  },
  {
    text: 'Earning Growth',
    path: 'financialData.earningsGrowth.fmt',
    compare: true
  },
  {
    text: 'Earnings Quarterly Growth',
    path: 'defaultKeyStatistics.earningsQuarterlyGrowth.fmt',
    compare: true
  },
  {
    text: 'Revenue Growth',
    path: 'financialData.revenueGrowth.fmt',
    compare: true
  },
  // INCOME STATEMENT
  {
    header: 'Last Income Statement'
  },
  {
    text: 'Date',
    path: 'incomeStatementHistory.incomeStatementHistory.0.endDate.fmt',
    compare: true
  },
  {
    text: 'Total Revenue',
    path: 'incomeStatementHistory.incomeStatementHistory.0.totalRevenue.fmt',
    compare: true
  },
  {
    text: 'Gross Profit',
    path: 'incomeStatementHistory.incomeStatementHistory.0.grossProfit.fmt',
    compare: true
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
    path: 'incomeStatementHistory.incomeStatementHistory.0.netIncome.fmt',
    compare: true
  },
  {
    text: 'Net Income Applicable To Common Shares',
    path: 'incomeStatementHistory.incomeStatementHistory.0.netIncomeApplicableToCommonShares.fmt',
    compare: true
  },
  // Company profile
  {
    header: 'Company Profile'
  },
  {
    text: 'Short Name',
    path: 'quoteType.shortName',
    compare: true
  },
  {
    text: 'Long Name',
    path: 'quoteType.longName',
    compare: true
  },
  {
    text: 'timeZoneFullName',
    path: 'quoteType.timeZoneFullName',
    compare: true
  },
  {
    text: 'Address',
    path: 'assetProfile.address1',
    compare: false
  },
  {
    text: 'City',
    path: 'assetProfile.city',
    compare: false
  },
  {
    text: 'State',
    path: 'assetProfile.state',
    compare: false
  },
  {
    text: 'Zip',
    path: 'assetProfile.zip',
    compare: false
  },
  {
    text: 'Country',
    path: 'assetProfile.country',
    compare: false
  },
  {
    text: 'Phone',
    path: 'assetProfile.phone',
    compare: false
  },
  {
    text: 'Website',
    path: 'assetProfile.website',
    compare: false,
  },
  {
    text: 'Industry',
    path: 'assetProfile.industry',
    compare: false,
  },
  {
    text: 'Sector',
    path: 'assetProfile.sector',
    compare: false,
  },
  {
    text: 'N.O Employee',
    path: 'assetProfile.fullTimeEmployees',
    compare: false,
  },
  {
    text: 'Officier',
    path: function(source) {
      const officiers = pathRead(source, 'assetProfile.companyOfficers');
      return <div>
          {officiers.map(officier => {
            const name = pathRead(officier, 'name');
            const title = pathRead(officier, 'title');
            return (<div>{name} ({title})</div>);
          })}
        </div>;
    },
    compare: false,
  },
  {
    text: 'Insider Holders',
    path: function(source) {
      const holders = pathRead(source, 'insiderHolders.holders');
      return <div>
          {holders.map(holder => {
            const name = pathRead(holder, 'name');
            const relation = pathRead(holder, 'relation');
            return (<div>{name} ({relation})</div>);
          })}
        </div>;
    },
  },
  {
    text: 'Fund Ownership',
    path: function(source) {
      const owners = pathRead(source, 'fundOwnership.ownershipList');
      return <div>
          {owners.map(owner => {
            const name = pathRead(owner, 'organization');
            const holdPercent = pathRead(owner, 'pctHeld.fmt');
            return (<div>{name} ({holdPercent})</div>);
          })}
        </div>;
    },
  },
  {
    text: 'Fund Ownership',
    path: function(source) {
      const owners = pathRead(source, 'institutionOwnership.ownershipList');
      return <div>
          {owners.map(owner => {
            const name = pathRead(owner, 'organization');
            const holdPercent = pathRead(owner, 'pctHeld.fmt');
            return (<div>{name} ({holdPercent})</div>);
          })}
        </div>;
    },
  },

  // Instrument
  {
    header: 'Instrument'
  },
  {
    text: 'Exchnage code',
    path: 'quoteType.exchange',
    compare: true
  },
  {
    text: 'Exchange Name',
    path: 'price.exchangeName',
    compare: true
  },
  {
    text: 'Quote type',
    path: 'quoteType.quoteType',
    compare: true
  },
  {
    text: 'Symbol',
    path: 'quoteType.symbol',
    compare: true
  },
  {
    text: 'Currency',
    path: 'summaryDetail.currency',
    compare: true
  },

  // Trending
  {
    header: 'Trending'
  },
  {
    text: 'Strong Buy',
    path: 'recommendationTrend.trend.0.strongBuy',
    compare: true
  },
  {
    text: 'Buy',
    path: 'recommendationTrend.trend.0.buy',
    compare: true
  },
  {
    text: 'Sell',
    path: 'recommendationTrend.trend.0.sell',
    compare: true
  },
  {
    text: 'Strong Sell',
    path: 'recommendationTrend.trend.0.strongSell',
    compare: true
  },
  {
    text: 'P/E ratio',
    path: 'indexTrend.peRatio.fmt',
    compare: true
  },
  {
    text: 'Price-to-Earnings Ratio',
    path: 'indexTrend.pegRatio.fmt',
    compare: true
  },
  {
    header: 'Calendar Events'
  },
  {
    text: 'Last Dividend Date',
    path: 'calendarEvents.exDividendDate.fmt',
    compare: true
  },
  {
    text: 'Last Dividend Date',
    path: 'calendarEvents.exDividendDate.fmt',
    compare: true
  },
  // Key Figures
  {
    header: 'Key Figures'
  },
  {
    text: 'Price Hint',
    path: 'defaultKeyStatistics.priceHint.fmt',
    compare: true
  },
  {
    text: 'Enterprise Value',
    path: 'defaultKeyStatistics.enterpriseValue.fmt',
    compare: true
  },
  {
    text: 'Forward P/E',
    path: 'defaultKeyStatistics.forwardPE.fmt',
    compare: true
  },
  {
    text: 'Float Shares',
    path: 'defaultKeyStatistics.floatShares.fmt',
    compare: true
  },
  {
    text: 'Shares Short',
    path: 'defaultKeyStatistics.sharesShort.fmt',
    compare: true
  },
  {
    text: 'Shares Short Previous Month Value',
    path: 'defaultKeyStatistics.sharesShortPriorMonth.fmt',
    compare: true
  },
  {
    text: 'Shares Short Previous Month',
    path: 'defaultKeyStatistics.sharesShortPreviousMonthDate.fmt',
    compare: true
  },
  {
    text: 'Share Outstanding Percent',
    path: 'defaultKeyStatistics.sharesPercentSharesOut.fmt',
    compare: true
  },
  {
    text: 'Held Percent Insiders',
    path: 'defaultKeyStatistics.heldPercentInsiders.fmt',
    compare: true
  },
  {
    text: 'Held Percent Institutions',
    path: 'defaultKeyStatistics.heldPercentInstitutions.fmt',
    compare: true
  },
  {
    text: 'Short Interest Ratio',
    path: 'defaultKeyStatistics.shortRatio.fmt',
    compare: true
  },
  {
    text: 'Short Percent Of Float',
    path: 'defaultKeyStatistics.shortPercentOfFloat.fmt',
    compare: true
  },
  {
    text: 'Beta',
    path: 'defaultKeyStatistics.beta.fmt',
    compare: true
  },
  {
    text: 'Book Value',
    path: 'defaultKeyStatistics.bookValue.fmt',
    compare: true
  },
  {
    text: 'Price To Book',
    path: 'defaultKeyStatistics.priceToBook.fmt',
    compare: true
  },
  {
    text: 'Earnings Quarterly Growth',
    path: 'defaultKeyStatistics.earningsQuarterlyGrowth.fmt',
    compare: true
  },
  {
    text: 'Net Income To Common',
    path: 'defaultKeyStatistics.netIncomeToCommon.fmt',
    compare: true
  },
  {
    text: 'Net Income To Common',
    path: 'defaultKeyStatistics.netIncomeToCommon.fmt',
    compare: true
  },
  {
    text: 'Enterprise To Revenue',
    path: 'defaultKeyStatistics.enterpriseToRevenue.fmt',
    compare: true
  },
  {
    text: 'Enterprise To Ebitda',
    path: 'defaultKeyStatistics.enterpriseToEbitda.fmt',
    compare: true
  },
  {
    text: '52 Week Price Change',
    path: 'defaultKeyStatistics.52WeekChange.fmt',
    compare: true
  },
  {
    text: 'S&P 52 Week Price Change',
    path: 'defaultKeyStatistics.SandP52WeekChange.fmt',
    compare: true
  },
  {
    text: 'S&P 52 Week Price Change',
    path: 'defaultKeyStatistics.SandP52WeekChange.fmt',
    compare: true
  },





  // https://www.marketwatch.com/investing/stock/pep/financials/cash-flow
  // https://finance.yahoo.com/quote/PEP/cash-flow/?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAALaTDtUIjFuh2G6j4Ajvcdg0rLiElg9WGfjYLUSPXIRoFaaudY_MJuDhU01Yx6uMbDVYkpzx9nfaOfC1CbQGrmE3eViIoLw5u7NEfTe7AX2x_lKEKqhlSbK48Lwgczwm5YcYiCffZxtnAm3N3m8C_L7qQuU8POaqkCnYScOlKMeP
  // Cashflow
  /* {
    header: 'Cashflow'
  },*/

];

const getParamSymbols = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return (urlParams.get('symbols') || "").split(",");
};

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

const fetchHistory = async (symbol, range, interval) => {
  const url = `${cors}https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&interval=${interval}&range=${range}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const HistoryChart = (props) => {
  const symbols = props.symbols;
  const [chartData, setChartData] = useState({
    labels: [],
    data: []
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (symbols) {
        const response = await Promise.all(symbols.map(async s => await fetchHistory(s, '5y', '5d')));
        const timestamps = response[0].chart.result[0].timestamp.map(t => {
          const parsed = new Date(t * 1000);
          return `${monthNames[parsed.getMonth()]} ${parsed.getFullYear()}`
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
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    var ctx = canvas.getContext('2d');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'LineWithLine',

      // The data for our dataset
      data: {
        labels: chartData.labels,
        datasets: chartData.data.map((c, i) => ({
          label: symbols[i],
          fill: false,
          borderColor: COLORS[i > COLORS.length ? i - Math.random(COLORS.length - 1) : i],
          borderWidth: 3,
          lineTension: 0,
          pointRadius: 0,
          pointHitRadius: 5,
          data: c
        }))
      },

      // Configuration options go here
      options: {
        title: {
          display: true,
          position: 'bottom',
          text: '5 Years Performance History'
        },
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0,0,0,0.6)',
          caretSize: 5,
          cornerRadius: 2,
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            label: (item, data) => {
              const dataset = data.datasets[item.datasetIndex];
              const value = dataset.data[item.index];
              return `${value}%`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false
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
                callback: (value, index) => index % 2 === 0 ? `${value}%` : ''
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
    });
  }, [chartData]);

  return <div id="chart-container" className="flex flex-col">
    <canvas className="flex-1" ref={canvasRef} />
    <ul className="p-3 m-3 mx-auto h-48 flex flex-row">
      <li>1D</li>
      <li>1D</li>
      <li>1D</li>
      <li>1D</li>
      <li>1D</li>
    </ul>
  </div>;
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

/**
 * A cool stuff help you quickly return the index of the maximum value of a human friendly notated array
 *                  #0     #1     #2
 * For example: [ '1.5M', '3B', '-2M' ] => 1
 */
const findMaxIndex = values => {
  let max = 0; let maxIndex = -1;
  values.forEach((v, idx) => {
    if (v) {
      let re = 0;
      if (!v.match) {
        re = v;
      } else {
        const multiply = (v.match(/K|M|B|T/i) || []).map(c => c === 'K' ? 1000 : (c === 'M' ? 1_000_000 : (c === 'B' ? 1_000_000_000 : (c === 'T' ? 1_000_000_000_000 : 1)))).pop() || 0;

        if (multiply) {
          let n = parseFloat(v.replace(/K|M|B|T/i, ''));
          re = n * multiply;
        } else {
          re = parseFloat(v.replace(/%|,/g, ''));
        }
      }
      if (re > max) {
        max = re;
        maxIndex = idx;
      }
    }
  });
  return maxIndex;
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
      const values = source.map(s => configExpression(s, field.path));
      const maxIndex = field.compare ? findMaxIndex(values) : -1;
      return <tr className="hover:bg-gray-100">
        <td className="py-3 pl-3 text-gray-700">{field.text}</td>
        {source.map((_, i) => <td className={`py-3 ${i === maxIndex ? 'font-bold' : ''}`}>{values[i]}</td>)}
      </tr>;
    }
  });
};

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
