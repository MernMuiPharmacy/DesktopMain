import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from '../Dashboard/Title';
const data = [
  {
    name: 'non-refrigerated',
    safe: 4000,
    close: 2400,
    expired: 2400,
  },
  {
    name: 'refrigerated',
    safe: 3000,
    close: 1398,
    expired: 2210,
  },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
];

export default function StockCondition(props) {
 // static demoUrl = 'https://codesandbox.io/s/stacked-bar-chart-s47i2';
var DATA=[{name:props.dat.labels[0], safe:props.dat.data[0][0],close:props.dat.data[0][1],expired:props.dat.data[0][2]
},{name:props.dat.labels[1],safe:props.dat.data[1][0],close:props.dat.data[1][1],expired:props.dat.data[1][2]
}]
      return (
      <ResponsiveContainer width="100%" height="90%">
        <Title>Stock Condition</Title>
        <BarChart
          width={500}
          height={300}
          data={DATA}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="safe" stackId="a" fill="#8884d8" />
          <Bar dataKey="close" stackId="a" fill="#82ca9d" />
          <Bar dataKey="expired" stackId="a" fill="#F8C12D"/>
        </BarChart>
      </ResponsiveContainer>
    );
  
}