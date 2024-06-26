/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {
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
var acc=0;
var b=mergeDataAndSalesWithPrices(props.d,col,5,19)


b.map((e)=>{acc=acc+parseInt(e["price sold for"])})
  return (
    <React.Fragment>
      <Title>Revenue</Title>
      <Typography component="p" variant="h4">
        {acc} tnd
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        today
      </Typography>
   
    </React.Fragment>
  );
}