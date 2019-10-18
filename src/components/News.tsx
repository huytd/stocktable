import * as React from 'react';
import {useEffect, useState} from 'react';

const PARSER_URL = `https://single-rss-worker.snackylab.workers.dev/?url=`;
const RSS_URL = `https://finance.yahoo.com/rss/headline?s=`;

type NewsItem = {
  date: Date,
  link: string,
  title: string
};

/**
 * TODO:
 * 1. Fetch the news feed from Yahoo RSS
 * 2. Parse it as a JSON data
 * 3. Render it out as a plain list, no fancy
 */
export const News = (props: { symbols: string[] }) => {
  const symbols = props.symbols;
  const [news, setNews] = useState([] as NewsItem[]);

  useEffect(() => {
    (async () => {
      const req = await fetch(`${PARSER_URL}${RSS_URL}${symbols.join(',')}`);
      const json = await req.json();
      if (json && json.items) {
        const items = json.items.map(i => ({
          date: new Date(i.date),
          link: i.link,
          title: i.title
        } as NewsItem));
        setNews(items);
      }
    })();
  }, [symbols])

  return <div className="p-3">
    <table className="w-full">
      <tbody>
        {
          news.map((item, i) => <tr className="hover:bg-gray-100" key={i}>
            <td className="p-1 text-sm"><a target="_blank" rel="noreferrer noopener" className="hover:text-gray-700" href={item.link}>{item.title}</a></td>
            <td className="p-1 text-sm"><span className="text-gray-500">{`${item.date.toLocaleDateString()} ${item.date.toLocaleTimeString()}`}</span></td>
          </tr>)
        }
      </tbody>
    </table>
  </div>;
};
