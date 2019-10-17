import * as React from 'react';
import { pathRead } from '../utils';
import { DayHighLow } from './DayHighLow';

export const TableConfig = [
  // PRICE
  {
    header: 'Pricing',
  },
  {
    text: 'Day Low/High',
    path: function (source) {
      const low = pathRead(source, 'summaryDetail.dayLow.raw');
      const high = pathRead(source, 'summaryDetail.dayHigh.raw');
      const value = pathRead(source, 'financialData.currentPrice.raw');
      return <DayHighLow low={low} high={high} value={value} />;
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
    path: function (source) {
      const officiers = pathRead(source, 'assetProfile.companyOfficers');
      return <div>
        {officiers.map(( officier, i ) => {
          const name = pathRead(officier, 'name');
          const title = pathRead(officier, 'title');
          return (<div key={i}>{name} ({title})</div>);
        })}
      </div>;
    },
    compare: false,
  },
  {
    text: 'Insider Holders',
    path: function (source) {
      const holders = pathRead(source, 'insiderHolders.holders');
      return <div>
        {holders.map((holder, i) => {
          const name = pathRead(holder, 'name');
          const relation = pathRead(holder, 'relation');
          return (<div key={i}>{name} ({relation})</div>);
        })}
      </div>;
    },
  },
  {
    text: 'Fund Ownership',
    path: function (source) {
      const owners = pathRead(source, 'fundOwnership.ownershipList');
      return <div>
        {owners.map((owner, i) => {
          const name = pathRead(owner, 'organization');
          const holdPercent = pathRead(owner, 'pctHeld.fmt');
          return (<div key={i}>{name} ({holdPercent})</div>);
        })}
      </div>;
    },
  },
  {
    text: 'Fund Ownership',
    path: function (source) {
      const owners = pathRead(source, 'institutionOwnership.ownershipList');
      return <div>
        {owners.map((owner, i) => {
          const name = pathRead(owner, 'organization');
          const holdPercent = pathRead(owner, 'pctHeld.fmt');
          return (<div key={i}>{name} ({holdPercent})</div>);
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
];

