/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart(props) {
  const theme = useTheme();
  const sort=(items,dstart,tstart,dend,tend)=>{
    var start=`${dstart}`+" "+(tstart.length?`${tstart}`:"00:00")+":00 GMT+0100 (West Africa Standard Time)"
    var end=`${dend}`+" "+(tend.length?`${tend}`:"23:59")+":00 GMT+0100 (West Africa Standard Time)"
    var result=[]
    items.map((e)=>{
        var itemDate;
        if(
            Date.parse(e.date)
        >=
            Date.parse(start)
            &&
            Date.parse(e.date)
        <=
            Date.parse(end)){
   result.push(e);console.log(e)
        }
    })
    
 return result
}
function mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage) {
  const mergedDataSales = JSON.parse(JSON.stringify(dataSales));

  mergedDataSales.forEach(sale => {
    const matchingProduct = data.find(product => {
      const normalizedTitle = sale["title"].toLowerCase().replace(/\s/g, '');
      const normalizedProductName = product.productName.toLowerCase().replace(/\s/g, '');

      return normalizedProductName.includes(normalizedTitle);
    });

    if (matchingProduct) {
      // Parse the product price as a float, and check if it's a valid number
      const soldForPrice = parseFloat(matchingProduct.price);

      if (!isNaN(soldForPrice)) {
        // Deduct tax percentage first
        const untaxedPrice = soldForPrice * (1 - taxPercentage / 100);

        // Deduct noMarkup percentage
        const markupPrice = untaxedPrice * (noMarkupPercentage / 100);
        const wholesalePrice = untaxedPrice - markupPrice;

        // Append the new properties to the sale object
        sale["price sold for"] = soldForPrice.toFixed(2);
        sale["price untaxed"] = untaxedPrice.toFixed(2);
        sale["price wholesale"] = wholesalePrice.toFixed(2);
      } else {
        // Handle the case where the price cannot be parsed as a valid number
        console.error(`Invalid price for product: ${matchingProduct.productName}`);
      }
    }
  });

  console.log("mergedDAtasales",mergedDataSales);
  return mergedDataSales;
}
var col=sort(props.dat,Date().slice(0,15),"",Date(+86400).slice(0,15),"")

function accumulateSalesByHour(salesData, currentTime) {
  const result = [];

  // Get the current hour from the provided time
  const currentHour = parseInt(currentTime.split(':')[0], 10);

  // Initialize the result array with zero amounts for each hour
  for (let hour = 0; hour < 24; hour++) {
    result.push({ time: `${hour.toString().padStart(2, '0')}:00`, amount: 0 });
  }

  // Accumulate amounts for sales that occurred on the current day and before or at the current hour
  salesData.forEach(sale => {
    const saleHour = new Date(sale.date).getHours();

    if (saleHour <= currentHour) {
      result[saleHour].amount += parseFloat(sale['price sold for']);
    }
  });

  // Adjust the amount for the current hour
  result[currentHour].amount = salesData.reduce((total, sale) => {
    const saleHour = new Date(sale.date).getHours();
    return saleHour === currentHour ? total + parseFloat(sale['price sold for']) : total;
  }, 0);
console.log(result)
  return result.slice(0, currentHour + 1);
}



  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={accumulateSalesByHour(mergeDataAndSalesWithPrices(props.d,col,5,19),Date().slice(16,21))}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales (tnd)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}