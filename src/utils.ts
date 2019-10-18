export const COLORS = ['#0f6fc6', '#009dd9', '#0bd0d9', '#10cf9b', '#7cca62', '#a5c249'];
const cors = `https://snackycors.herokuapp.com/`;

export const decodeHTML = (html) => {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

export const getParamSymbols = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return (urlParams.get('symbols') || "").split(",");
};

export const pathRead = (obj, path) => {
  let paths = path.split('.'), current = obj, i;
  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] == undefined) {
      return undefined;
    }
    else {
      current = current[paths[i]];
    }
  }
  return current;
};

export const configExpression = (source, path) => {
  if (typeof path === "function") {
    return path(source);
  }
  if (typeof path === "string") {
    if (path !== '-') {
      return pathRead(source, path);
    }
    else {
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

export const fetchStock = async (symbol) => {
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

export const fetchHistory = async (symbol, range, interval) => {
  const url = `${cors}https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&interval=${interval}&range=${range}`;
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

/**
 * A cool stuff help you quickly return the index of the maximum value of a human friendly notated array
 *                  #0     #1     #2
 * For example: [ '1.5M', '3B', '-2M' ] => 1
 */
export const findMaxIndex = values => {
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
