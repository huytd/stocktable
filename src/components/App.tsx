import * as React from 'react';

const DayLH = (props) => {
  const low = props.low;
  const high = props.high;
  const value = props.value;
  const per = (value - low) * 100 / (high - low);
  return <div>
    <span>{low}</span>
    <progress value={per} max="100" />
    <span>{high}</span>
  </div>
};

export const App = () => {
  return <div className="w-full h-full flex flex-col">
    <input type="text" className="p-3 bg-gray-200 m-5 mb-0 rounded" placeholder="Search for a symbol..." />
    <div className="flex-1 p-5">
      <table className="w-full">
        <tr className="border-b">
          <td className="py-3"></td>
          <td className="py-3">
            <h1 className="font-bold mr-2">NVDA</h1>
            <h2 className="inline-block text-gray-800 mr-2">177.23</h2>
            <h2 className="inline-block text-green-600">+15.25%</h2>
          </td>
          <td className="py-3">
            <h1 className="font-bold mr-2">AMD</h1>
            <h2 className="inline-block text-gray-800 mr-2">28.23</h2>
            <h2 className="inline-block text-tomato-600">-2.42%</h2>
          </td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Day L/H</td>
          <td className="py-3"><DayLH low={176.50} high={180.64} value={177.23} /></td>
          <td className="py-3"><DayLH low={27.92} high={28.64} value={28.23} /></td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Market Cap.</td>
          <td className="py-3">107,933,064,000</td>
          <td className="py-3">36,024,022</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Shares Outstanding</td>
          <td className="py-3">401,205,824</td>
          <td className="py-3">1,805,564</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">P/E Ratio</td>
          <td className="py-3">48.13</td>
          <td className="py-3">131.50</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">EPS</td>
          <td className="py-3">3.83</td>
          <td className="py-3">0.22</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Price/Sales</td>
          <td className="py-3">9.58</td>
          <td className="py-3">4.85</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Dividend Yield</td>
          <td className="py-3">0.35%</td>
          <td className="py-3">0.0%</td>
        </tr>
        <tr className="hover:bg-gray-100">
          <td className="py-3 text-gray-600">Profit Margin</td>
          <td className="py-3">26.93%</td>
          <td className="py-3">3.25%</td>
        </tr>
      </table>
    </div>
  </div>;
};
