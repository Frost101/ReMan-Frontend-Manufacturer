import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
      "ProductName": "Ruchi Banana Chips",
      "TotalPrice": 45000
    },
    {
      "ProductName": "Ruchi Potato Chips",
      "TotalPrice": 41076
    },
    {
      "ProductName": "Ruchi Orange Juice",
      "TotalPrice": 39456.92
    },
    {
      "ProductName": "Ruchi Spicy Chips",
      "TotalPrice": 37500
    },
    {
      "ProductName": "Ruchi Pepper Chips",
      "TotalPrice": 11963
    },
    {
      "ProductName": "Ruchi Lichi Juice",
      "TotalPrice": 9000
    },
    {
      "ProductName": "Ruchi Alooz Chips",
      "TotalPrice": 7500
    },
];

export default class TotalRevenue extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" maxHeight="400px">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ProductName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="TotalPrice" fill="#003a61" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}