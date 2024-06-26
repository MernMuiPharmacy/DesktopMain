/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Title from '../Dashboard/Title';
const data = [
  {
    name: '18-24',
    uv: 31.47,
    pv: 2400,
    fill: '#8884d8',
  },
  {
    name: '25-29',
    uv: 26.69,
    pv: 4567,
    fill: '#83a6ed',
  },
  {
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: '#8dd1e1',
  },
  {
    name: '35-39',
    uv: 8.22,
    pv: 9800,
    fill: '#82ca9d',
  },
  {
    name: '40-49',
    uv: 8.63,
    pv: 3908,
    fill: '#a4de6c',
  },
  {
    name: '50+',
    uv: 2.63,
    pv: 4800,
    fill: '#d0ed57',
  },
  {
    name: 'unknow',
    uv: 6.67,
    pv: 4800,
    fill: '#ffc658',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

export default function IngredientShare(props){
 // static demoUrl = 'https://codesandbox.io/s/simple-radial-bar-chart-qf8fz';


 var DATA=[]
 props.dat.map((e,index)=>{ const colorFills=['#8884d8','#83a6ed','#8dd1e1','#82ca9d','#a4de6c','#d0ed57','#ffc658']
 e.repetitions!==0&&index<7?DATA.push({name:e.activeIngredient,uv:e.repetitions,fill:colorFills[index]!==undefined?colorFills[index]:"#ffaa"}):null
})
    return (
      <ResponsiveContainer width="100%" height="90%">
        <Title>Marketshare (Active ingredient)</Title>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={DATA}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: 'transparent' }}
            background
            clockWise
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    );

}