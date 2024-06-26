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
import { useNavigation } from '@react-navigation/native';
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
var col=sort(props.dat,Date().slice(0,15),"",Date(+86400).slice(0,15),"")
console.log("col",col)
const navigation=useNavigation();
  return (
    <React.Fragment>
      <Title>Recent articles</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>title</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {col.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.date}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={()=>{navigation.navigate("Sales")}} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}