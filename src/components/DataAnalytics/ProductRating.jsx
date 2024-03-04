import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
      "ProductName": "Sports Drink",
      "Rating": 5
    },
    {
      "ProductName": "Clear Up",
      "Rating": 4.92
    },
    {
      "ProductName": "Lemon",
      "Rating": 4.91
    },
    {
      "ProductName": "Ruchi Lichi Juice",
      "Rating": 4.89
    },
    {
      "ProductName": "Ruchi Jhurivaja",
      "Rating": 4.88
    },
    {
      "ProductName": "Apple Juice",
      "Rating": 4.87
    },
    {
      "ProductName": "Ruchi Potato Chips",
      "Rating": 4.82
    },
    {
      "ProductName": "Ruchi Alooz Chips",
      "Rating": 4.78
    },
    {
      "ProductName": "Ruchi Barbq Chanachur",
      "Rating": 4.73
    },
    {
      "ProductName": "Ruchi Jhal Chanachur",
      "Rating": 4.7
    },
    {
      "ProductName": "Ruchi Mango Juice",
      "Rating": 4.56
    },
    {
      "ProductName": "Ruchi Pepper Chips",
      "Rating": 4.5
    },
    {
      "ProductName": "Ruchi Orange Juice",
      "Rating": 4.5
    },
    {
      "ProductName": "Ruchi Banana Chips",
      "Rating": 4.31
    },
    {
      "ProductName": "Cola",
      "Rating": 4.2
    },
    {
      "ProductName": "Ruchi Strawberry Juice",
      "Rating": 4.133
    },
    {
      "ProductName": "Ruchi Classic Chanachur",
      "Rating": 4
    },
    {
      "ProductName": "Ruchi Spicy Chips",
      "Rating": 3.87
    },
    {
      "ProductName": "Orangy Bubble",
      "Rating": 3.65
    },
];

export default class ProductRating extends PureComponent {
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
          <Bar dataKey="Rating" fill="#2f0e07" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}