import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
      "ProductName": "Ruchi Banana Chips",
      "TotalQuantity": 3000
    },
    {
      "ProductName": "Ruchi Potato Chips",
      "TotalQuantity": 2360
    },
    {
      "ProductName": "Ruchi Orange Juice",
      "TotalQuantity": 2303
    },
    {
      "ProductName": "Ruchi Spicy Chips",
      "TotalQuantity": 2100
    },
    {
      "ProductName": "Ruchi Pepper Chips",
      "TotalQuantity": 657
    },
    {
      "ProductName": "Ruchi Lichi Juice",
      "TotalQuantity": 500
    },
    {
      "ProductName": "Ruchi Alooz Chips",
      "TotalQuantity": 400
    },
];

export default class TotalQuantity extends PureComponent {
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
          <Bar dataKey="TotalQuantity" fill="#0b525b" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}