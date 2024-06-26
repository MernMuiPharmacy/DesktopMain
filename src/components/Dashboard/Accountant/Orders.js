/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Typography } from '@mui/material';
import { View } from 'react-native';
import TextField from '@mui/material/TextField';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders(props) {
  const waitForProfit= async ()=>{
    var profit=await props.profit
    return profit
  }
  return (
    <React.Fragment>
      <Title>Sales {props.dateStart.length?`from: ${props.dateStart} ${props.tstart}`:null} {props.dateEnd.length?`to: ${props.dateEnd} ${props.tend}`:null}</Title>
      {<View style={{flexDirection:"row"}}>{/*<View style={{flexDirection:"column"}}>*/}
      
        <TextField style={{marginInline:8}}
          id="outlined-number"
          label="Tax Rate %"
          defaultValue={props.taxPercentage}
          onChange={(e)=>{props.setTaxPercentage(parseFloat(e.nativeEvent.data)),console.log(e)}}
    
          type="number"
          InputLabelProps={{
            shrink: true,
            //value:props.taxPercentage

          }}
        />
          <TextField style={{marginInline:8}}
          id="outlined-number"
          label="Profit Margin %"
         defaultValue={props.noMarkupPercentage}
          onChange={(e)=>{props.setNoMarkupPercentage(parseFloat(e.nativeEvent.data)),console.log(e)}}
          type="number"
          InputLabelProps={{
            shrink: true,
            //value:props.noMarkupPercentage
          }}
        />
          <TextField style={{marginInline:8}}
          id="outlined-read-only-input"
          label={props.profit>0?"Profit":"Losses"}
          //color='success'
          focused
          helperText="*On Sold Items"
          color={props.profit>0?"success":"error"}
        
          InputProps={{
            readOnly: true,
            value:props.profit,
           // color:props.profit>0?"success":"error"
          }}
        />
         <TextField style={{marginInline:8}}
          id="outlined-read-only-input"
          label="Taxes Due"
          //color='success'
          focused
          color='warning'
          
          InputProps={{
            readOnly: true,
            value:props.taxDue.toFixed(2),
           // color:props.profit>0?"success":"error"
          }}
        />
       {/* <Typography color={props.profit>0?"green":"firebrick"}> {props.profit>0?"profit: "+props.profit:"losses: "+props.profit}</Typography></View> */}
       <TextField style={{marginInline:8}}
          id="outlined-read-only-input"
          label="Expired Stock"
          //color='success'
          focused
          color={props.expiredStock===0?"success":"error"}
          //defaultValue="0"
          InputProps={{
            readOnly: true,
            value:props.expiredStock,
           // color:props.profit>0?"success":"error"
          }}
        />
       {/* <Typography color={props.expiredStock===0?"green":"firebrick"}> expired Stock: {props.expiredStock}</Typography> */}
       {/* <TextField style={{marginInline:8}}
          id="outlined-read-only-input"
          label="Total Not Sold"
          //color='success'
          focused
          color={props.totalNotSold===0?"success":"error"}
          //defaultValue="0"
          InputProps={{
            readOnly: true,
            value:props.totalNotSold
           // color:props.profit>0?"success":"error"
          }}
        /> */}
       {/* <Typography color="firebrick"> total not sold: {props["totalNotSold"]} </Typography> */}
       <TextField style={{marginInline:8}}
          id="outlined-read-only-input"
          label="Total Costs"
          //color="primary"
          //focused
          //color={props.expiredStock===0?"success":"error"}
         // defaultValue="0"
          InputProps={{
            readOnly: true,
            value:props.totalCost,
           // color:props.profit>0?"success":"error"
          }}
        />
      {/* <Typography>total Costs: {props.totalCost}</Typography> */}
      </View>}
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Untaxed</TableCell>
            <TableCell>Wholesale</TableCell>
            {/* <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.props.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date.slice(0,row.date.length-8)}</TableCell>
              <TableCell>{row.date.slice(row.date.length -8)}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row["price sold for"]}</TableCell>
              <TableCell>{row["price untaxed"]}</TableCell>
              <TableCell>{row["price wholesale"]}</TableCell>
              {/* <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
     
      {/* <Typography sx={{ mt: 3 }}>further sales options available for  <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>Accountant</Link> role</Typography> */}
    </React.Fragment>
  );
}