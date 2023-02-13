import React from 'react';
import { useAsyncMemo } from 'use-async-memo';
import { apiCaller } from './utils';
import './App.css';

function App() {

  const rewards = useAsyncMemo(async () => {
    try {

      // I am guessing I get logs from January to March.

      // Method - GET
      // Request Params - 
      // Response Params - { name: string, amount: number, date: string }
      const {
        data: { payments }
      } = await apiCaller.get('/users/getPayments');

      var temp = {};
      for(var payment of payments) {
        const {name, amount, date} = payment;
        let reward = 0;
        const currentDate = new Date(date);
        const month = currentDate.getMonth();

        if(amount > 50) {
          reward += amount - 50;
        }
        if (amount > 100) {
          reward += amount - 100;
        }
        // Saving data for displaying on the screen
        if(!temp[name]) {
          temp[name] = {
            rewards: new Array(4).fill(0),  // First value is total, second: first month, third: second month, fourth: third month.
          }
        }

        temp[name].rewards[0] += reward;
        temp[name].rewards[month + 1] += reward;
      }
      return temp;
    } catch (error) {
      console.error("Something went wrong.");
      return {};
    }
  }, [])

  return (
    <div className="App">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Client Name
              </th>
              <th scope="col" className="px-6 py-3">
                January
              </th>
              <th scope="col" className="px-6 py-3">
                Feburary
              </th>
              <th scope="col" className="px-6 py-3">
                March
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {rewards && Object.keys(rewards).map((key, index) => (
              <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                <td className="px-6 py-4">
                  {key}
                </td>
                <td className="px-6 py-4">
                  {rewards[key].rewards[1]}
                </td>
                <td className="px-6 py-4">
                  {rewards[key].rewards[2]}
                </td>
                <td className="px-6 py-4">
                  {rewards[key].rewards[3]}
                </td>
                <td className="px-6 py-4">
                  {rewards[key].rewards[0]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
