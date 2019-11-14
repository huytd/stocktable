import * as React from 'react';
import {pathRead} from '../utils';

export const StockCalendar = props => {
  const dates = props.dataSource.map((s, i) => {
    const symbol = pathRead(s, 'price.symbol');
    const earningDateStr = pathRead(s, 'calendarEvents.earnings.earningsDate.0.fmt');
    const earningDate = new Date(`${earningDateStr}T00:00:00`);
    const dividendDateStr = pathRead(s, 'calendarEvents.dividendDate.fmt');
    const dividendDate = new Date(`${dividendDateStr}T00:00:00`);
    const exDividendDateStr = pathRead(s, 'calendarEvents.exDividendDate.fmt');
    const exDividendDate = new Date(`${exDividendDateStr}T00:00:00`);
    return [
      earningDate.toString() !== 'Invalid Date' ? {
        symbol: symbol,
        type: 'earning',
        date: earningDate,
        original: earningDateStr
      } : undefined,
      dividendDate.toString() !== 'Invalid Date' ? {
        symbol: symbol,
        type: 'dividend',
        date: dividendDate,
        original: dividendDateStr
      } : undefined,
      exDividendDate.toString() !== 'Invalid Date' ? {
        symbol: symbol,
        type: 'exdividend',
        date: exDividendDate,
        original: exDividendDateStr
      } : undefined,
    ]
  });

  const calendar = [].concat.apply([], dates).filter(a => !!a);
  calendar.sort((a, b) => a.date > b.date);

  const today = new Date();

  return <div className="p-3 border-b">
    <div className="font-bold mb-3">Upcoming Events:</div>
    {calendar.map(c => {
      return <div className={`inline-block w-1/3 border-l-4 mb-2 pl-2 ${c.type === 'earning' ? 'border-tomato-400' : (c.type === 'dividend' ? 'border-lime-400' : 'border-blue-500')} ${c.date < today ? 'opacity-25' : ''}`}>
        <div className="uppercase text-xs text-gray-600">{c.type}</div>
        <div className="uppercase"><span className="font-bold">{c.symbol}</span> <span>{c.date.toLocaleDateString()}</span></div>
      </div>;
    })}
  </div>;
};
