/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import * as XLSX from "xlsx";
import {useState,useEffect} from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { East,ArrowBack, DateRange, EventAvailable, Inventory, LocalShipping, QuestionMark, Restore, Update, UpdateDisabled } from '@mui/icons-material';


//import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { RightmainListItems, RightsecondaryListItems } from './RightListItems';

import Orders from './Orders';
import PromptDialog from './PromptDialog';
import { AccountCircle, Brightness5, DarkMode, EditCalendar } from '@mui/icons-material';
import AccDrop from './AccDrop';
import { Popover } from '@mui/material';
import { TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LINK_TO_BACKEND } from '../../../var';
import {useSelector,useDispatch} from 'react-redux';
import {reduxWipeStockDeletions} from '../../../redux/DataDeletedStock'
import {reduxWipeSupplierDeletions,reduxWipeSupplier} from '../../../redux/DataDeletedSuppliers'
import {reduxWipeFromStock} from '../../../redux/DataDeletedStock'
import {reduxWipeFromSales} from '../../../redux/DataSales'
import { reduxfetchStaff } from '../../../redux/DataStaff';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/devAtefturki">
        Atef Turki
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;
const drawerWidthRight = 340;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const DrawerRight = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidthRight,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
// TODO remove, this demo shouldn't need to reset the theme.

// TODO 2 change this into a state later, mostly based on the time of day? dont forget to use useEffect(based on hour change?) or else it wll be unchanging
export default function Accountant(props) {
  const dispatch=useDispatch()
  const [DATA,setDATA]=useState([]);
  const unload=async ()=>{
    const val= await AsyncStorage.removeItem('tokenCookie');
    if (val!==null){ return props.cb("")}

  }
  const ds=useSelector(state=>state.datastock)
  const onloadData=async ()=>{
    await axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}stock/getAllStock`
    }).then((response)=>{
        console.log(response)
        setDATA(response.data)
    });
///setDATA(await ds.value.data)

 }
  const selecting=["timeStart","timeEnd","dateStart","dateEnd"]
  const [selectingTs,setSTS]=useState(false);
  const [selectingTe,setSTE]=useState(false);
  const [selectingDs,setSDS]=useState(false);
  const [selectingDe,setSDE]=useState(false);
  const dateSelect=(query)=>{
if (query==="timeStart"){setSTS(true),setSTE(false),setSDS(false),setSDE(false)}
else if (query==="timeEnd"){setSTS(false),setSTE(true),setSDS(false),setSDE(false)}
else if (query==="dateStart"){setSTS(false),setSTE(false),setSDS(true),setSDE(false)}
else if (query==="dateEnd"){setSTS(false),setSTE(false),setSDS(false),setSDE(true)}
  }
  const [DATASALES,setDATASALES]=useState([]);
  const [theme,setTheme]=React.useState(props.theme)
  const [open, setOpen] = React.useState(true);
  const [DateOpen,setDateOpen]=React.useState(false)
  const [accdrop,setAccdrop]=React.useState(false);
 //const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
 const defaultTheme = createTheme({palette:{mode:props.theme}});
 const navigation=useNavigation();
 const changeTheme=(current)=>{
if (current==="light"){props.themeCB("dark")}
else if (current==="dark"){props.themeCB("light")}
 }
  const toggleDrawer = () => {
    if(open&&!DateOpen){setOpen(!open)}
  else if(!DateOpen&&!open){setOpen(!open)}
  else if(DateOpen&&open){setOpen(!open)}
  else if(DateOpen&&!open){setOpen(!open),setDateOpen(!DateOpen)}
   
  };
 const toggleDateDrawer = () => {
  if(open&&!DateOpen){setOpen(!open),setDateOpen(!DateOpen)}
  else if(!DateOpen&&!open){setDateOpen(!DateOpen)}
  else if(DateOpen&&open){setDateOpen(!DateOpen)}
  else if(DateOpen&&!open){setDateOpen(!DateOpen)}
  };

  const dsa=useSelector(state=>state.datasales)
  const onloadSales=async ()=>{
    await axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}sales/getAllSales`
    }).then((response)=>{
        console.log(response)
        var counter=1
        var toBe=[]
        response.data.map((e)=>{toBe.push({id:counter,title:e["productName"],date:formatDate(e["date"])}),counter++})
        setDATASALES(toBe)
    });
  //  setDATASALES(await dsa.value)
  }
  
  function formatDate(inputDate) {

      const parts = inputDate.split(/[\s/:]+/);
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      const hours = parseInt(parts[3], 10);
      const minutes = parseInt(parts[4], 10);
      const seconds = parseInt(parts[5], 10);
    
 
      const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    
      const dayOfWeek = daysOfWeek[dateObject.getDay()];
      const dayOfMonth = dateObject.getDate();
      const monthName = dateObject.toLocaleString('en-us', { month: 'short' });
      const yearValue = dateObject.getFullYear();
      const time = dateObject.toLocaleTimeString();
    
 
      const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${yearValue} ${time}`;
    
      return formattedDate;
    }
const [promptOpen,setPromptOpen]=React.useState(false);
const [accountantValidated,setAccountantValidated]=React.useState(false);
const [accountantCredentials,setAccountantCredentials]=React.useState({});   
const [staffdata,setstaffdata]=React.useState([]) ;
const [queriedSales,setQueriedSales]=React.useState([]);
const [excelled,setExcelled]=React.useState([]);
const [suppData,setSuppData]=React.useState([]);
const [localSuppQuery,setLocalSuppQuery]=React.useState([]);//ids
const [localSuppCompanyNames,setLocalSuppCompanyNames]=React.useState([]);
const [localQueryThroughSupplier,setLocalQueryThroughSupplier]=React.useState([]);
const [stkData,setStkData]=React.useState([]);
const [finished,setfinished]=React.useState(false);
const ddelsupp=useSelector(state=>state.datadeletedsuppliers)
const onloadsupp=async ()=>{
  await axios({
      method:'get',
      //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
      url:`${LINK_TO_BACKEND}deletedsuppliers/seeDeletions`
  }).then((response)=>{
      console.log(response)
    
    //  var toBe=[]
    //  response.data.map((e)=>{toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.providers,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})});
     
     // console.log(toBe)
     
     setSuppData(response.data)
  

     //console.log(data)
     
})
//setSuppData(await ddelsupp.value)
}
const ddelstock=useSelector(state=>state.datadeletedstock)
const onloaddelstock=async ()=>{
  await axios({
      method:'get',
      //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
      url:`${LINK_TO_BACKEND}deletedstock/seeDeletions`
  }).then((response)=>{
      console.log(response)
    
    //  var toBe=[]
    //  response.data.map((e)=>{toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.providers,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})});
     
     // console.log(toBe)
     
     setStkData(response.data)
  

     //console.log(data)
     
})
//setStkData(await ddelstock.value)
}
//should add users array and respective 
const isthereQuery=(query)=>{
  //if there is a query, first you show a password and accountant prompt
  query.length&&query!==undefined?setPromptOpen(true):null
//axios requrest credentials from dialogue
  var col=[];
  query.length&&query!==undefined?
  DAT.map((e,i)=>{if (query.includes(e.productName)){col.push(e)}})
  
  :null
  return col
};
const isthereSupplierQuery=(query)=>{
  query.length&&query!==undefined?setPromptOpen(true):null
  var col=[];
  query.length&&query!==undefined?DAT.map((e,i)=>{if (query.includes(e.id)){col.push(e.providers)}}):null

  return col

}
dispatch(reduxfetchStaff())
const stf=useSelector(state=>state.datastaff)
const isQueryingLoadStaff=async ()=>{
  await axios({
    method:'get',
    headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}staff/getAllUsers`
}).then((response)=>{
    console.log(response)
  
    var toBe=[]
    props.supplierQuery!=undefined?response.data.map((e)=>{toBe.push({id:e.idstaff,name:e.name,role:e.role,email:e.email,activated:e.activationStatus})}):null;
   
    console.log(toBe)
   
   setstaffdata(toBe)


   console.log("staffdata",staffdata)
   
})
//setstaffdata(stf.value)
}
const QueryDataSales=async ()=>{
  var col=[];
  var qr=[];
  console.log("props dot query",props.query);
 props.query.map((e)=>{qr.push(e.productName)})
 console.log("qr",qr);
 console.log("datasales from querydatasales",DATASALES)
DATASALES.map((e)=>{if(qr.includes(e.title)){col.push(e)}})

console.log("col from querydatasales",col);
if (col.length===0){alert(
  "no sales for selected product(s)"
);
handleWipeWithoutSales()}
else return col

}

const QueryDataSalesSupp=async ()=>{
  var col=[];
  var qrsupp=[];//qr 
  var qr=[];

 props.supplierQuery.map((e)=>{console.log("element at props.supplierquery",e),qrsupp.push(e.iddprovider)})
 stkData.map((e)=>{qr.push(e.productName)})
 DATASALES.map((e)=>{if (qr.includes(e.title)){col.push(e)}})


console.log("col from querydatasales",col);
if (col.length===0){alert(
  "no sales for selected product(s)" );
 handleWipeSuppWithoutSales()}
else 
return col

}  //this is to be used in mergeDataWithSales
// !!notice!! export happens before wiping!!!!

const handleWipe=()=>{
props.query.map((e)=>{dispatch(reduxWipeStockDeletions(e.productName))})
props.query.map((e)=>{dispatch(reduxWipeFromStock(e.productName))})
props.query.map((e)=>{dispatch(reduxWipeFromSales(e.productName))});
setfinished(true)
}
const handleWipeWithoutSales=()=>{
  props.query.map((e)=>{dispatch(reduxWipeFromStock(e.productName))})
props.query.map((e)=>{dispatch(reduxWipeStockDeletions(e.productName))});
setfinished(true)
}
const handleWipeSupp=()=>{
  stkData.map((e)=>{dispatch(reduxWipeFromStock(e.productName))})
stkData.map((e)=>{dispatch(reduxWipeStockDeletions(e.productName))})
stkData.map((e)=>{dispatch(reduxWipeFromSales(e.productName))})
props.supplierQuery.map((e)=>{dispatch(reduxWipeSupplier(e.companyname))})
props.supplierQuery.map((e)=>{dispatch(reduxWipeSupplierDeletions(e.companyname))});
setfinished(true)
}
const handleWipeSuppWithoutSales=()=>{
  stkData.map((e)=>{dispatch(reduxWipeFromStock(e.productName))})
stkData.map((e)=>{dispatch(reduxWipeStockDeletions(e.productName))})
props.supplierQuery.map((e)=>{dispatch(reduxWipeSupplier(e.companyname))})
props.supplierQuery.map((e)=>{dispatch(reduxWipeSupplierDeletions(e.companyname))})
setfinished(true)
}
const handleExcelThroughQuery=async ()=>{
  var DATQ = mergeDataAndSalesWithPrices(DATA,await QueryDataSales(),noMarkupPercentage,taxPercentage)
    //dataArray
    const dataArray = dateEnd.length ? sort(DATQ,dateStart,fromT,dateEnd,toT) : DATQ;
    const data = dataArray.map(obj => Object.values(obj));
    //footerRow
    const footerRow = [
      //`total Not Sold:  ${calculateTotalWholesaleWithSales(DATA,dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT,taxPercentage,noMarkupPercentage)}`,
      `taxes due:  ${dateEnd.length?calculateTotalTax(sort(DATQ,dateStart,fromT,dateEnd,toT)).toFixed(2):calculateTotalTax(DATQ).toFixed(2)} `,
     // `total Costs:  ${calculateTotalWholesale(DATA,taxPercentage,noMarkupPercentage)}`,
     // `expired: ${calculateExpiredProductsTotal(DATA)}`,
      `profit(+)/losses(-): ${calculateProfit(DATA,dateEnd.length ? sort(DATQ,dateStart,fromT,dateEnd,toT) : DATQ,noMarkupPercentage,taxPercentage,calculateExpiredProductsTotal(DATA))}`
    ];
//do not forget to add signature
  const headerRow = Object.keys(dataArray[0]);
    data.unshift(headerRow);


    data.push(footerRow);


    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

 
    const wbBlob = XLSX.writeFileXLSX(wb,`${Date().slice(0,21)}.xlsx`);

  
    const downloadLink = document.createElement('a');
    //const url = URL.createObjectURL(wbBlob);
   // downloadLink.href = url;
    downloadLink.download =`${Date().slice(0,23)}.xlsx`;
    document.body.appendChild(downloadLink);

 
    downloadLink.click();

    setExcelled(true);
    handleWipe()
    //URL.revokeObjectURL(url);
    //document.body.removeChild(downloadLink);
  }
  const handleExcelThroughSuppQuery=async ()=>{
    var DATQ=mergeDataAndSalesWithPrices(DATA,await QueryDataSalesSupp(),noMarkupPercentage,taxPercentage)
        //dataArray
        const dataArray = dateEnd.length ? sort(DATQ,dateStart,fromT,dateEnd,toT) : DATQ;
        const data = dataArray.map(obj => Object.values(obj));
        //footerRow
        const footerRow = [
          //`total Not Sold:  ${calculateTotalWholesaleWithSales(DATA,dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT,taxPercentage,noMarkupPercentage)}`,
          `taxes due:  ${dateEnd.length?calculateTotalTax(sort(DATQ,dateStart,fromT,dateEnd,toT)).toFixed(2):calculateTotalTax(DATQ).toFixed(2)} `,
         // `total Costs:  ${calculateTotalWholesale(DATA,taxPercentage,noMarkupPercentage)}`,
         // `expired: ${calculateExpiredProductsTotal(DATA)}`,
          `profit(+)/losses(-): ${calculateProfit(DATA,dateEnd.length ? sort(DATQ,dateStart,fromT,dateEnd,toT) : DATQ,noMarkupPercentage,taxPercentage,calculateExpiredProductsTotal(DATA))}`
        ];
    //do not forget to add signature
      const headerRow = Object.keys(dataArray[0]);
        data.unshift(headerRow);
    
    
        data.push(footerRow);
    
    
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
     
        const wbBlob = XLSX.writeFileXLSX(wb,`${Date().slice(0,21)}.xlsx`);
    
      
        const downloadLink = document.createElement('a');
        //const url = URL.createObjectURL(wbBlob);
       // downloadLink.href = url;
        downloadLink.download =`${Date().slice(0,23)}.xlsx`;
        document.body.appendChild(downloadLink);
    
     
        downloadLink.click();
    
        setExcelled(true);
        handleWipeSupp()
        //URL.revokeObjectURL(url);
        //document.body.removeChild(downloadLink);
  }


//before excel handling, be sure to filter first the sales AND THEN use mergeDataWithSales 
useEffect(()=>{if (accountantValidated&&props.query.length){handleExcelThroughQuery(),onloadsupp()}},[accountantValidated])
//useEffect(()=>{if (excelled&&accountantValidated&&props.query.length){handleWipe()}},[excelled])
useEffect(()=>{isthereQuery(props.query),isQueryingLoadStaff()},[props.query])
useEffect(()=>{if(props.supplierQuery!==undefined){isthereSupplierQuery(props.supplierQuery),isQueryingLoadStaff()}},[props.supplierQuery])

useEffect(()=>{if (accountantValidated&&props.supplierQuery){handleExcelThroughSuppQuery(),onloadsupp()}},[accountantValidated])
//useEffect(()=>{if (excelled&&accountantValidated&&props.supplierQuery.length){handleWipeSupp()}},[excelled])
useEffect(()=>{  if(finished===true){setTimeout(()=>{window.location.reload(false)},1500)}},[finished]) 


useEffect (()=>{onloadData(),onloadSales(),onloaddelstock()},[])
const [noMarkupPercentage,setNoMarkupPercentage]=useState(5);
const [modalMarkup,setModalMarkup]=useState(false)
const [modalTax,setModalTax]=useState(false)
const [taxPercentage,setTaxPercentage]=useState(19)
const [highlightedIDs,setHighlighterdIDS]=useState([])
const [refresh,setRefresh]=useState(false)
  //dont forget to add the sales dynamically by use effect
  const [visibleStartDate,setvisibleStartDate]=useState(false);
  const [visibleEndDate,setvisibleEndDate]=useState(false);
  const [visibleStartTime,setVisibleStartTime]=useState(false);
  const [visibleEndTime,setVisibleEndTime]=useState(false);
  const [dateStart,setDateStart]=useState("")
  const [dateEnd,setDateEnd]=useState("")
  const [fromT,setFromT]=useState("")
  const [toT,setToT]=useState("")

//for clock module
const onConfirmStartTime =
  React.useCallback(({hours,minutes})=>{
     setVisibleStartTime(false)
      //true boolean means start
setFromT(addZero(hours).toString()+":"+addZero(minutes).toString())
  })

const onConfirmStartDate=
  React.useCallback((params)=>{
   setvisibleStartDate(false)
      //true boolean means start
    setDateStart(params.date.toString().slice(0,15))

  }

  )

const onConfirmEndTime =
  React.useCallback(({hours,minutes})=>{
  setVisibleEndTime(false);
  console.log(hours,minutes)
      //true boolean means start
setToT(addZero(hours).toString()+":"+addZero(minutes).toString())
  })

const onConfirmEndDate=
  React.useCallback((params)=>{
    setvisibleEndDate(false);
      //true boolean means start
  setDateEnd(params.date.toString().slice(0,15))
  }
  )
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
const addZero=(i)=>{
    if (i<10){i="0"+i}
    return i;
}


function formatDate(inputDate) {

  const parts = inputDate.split(/[\s/:]+/);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);
  const seconds = parseInt(parts[5], 10);


  const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);


  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


  const dayOfWeek = daysOfWeek[dateObject.getDay()];
  const dayOfMonth = dateObject.getDate();
  const monthName = dateObject.toLocaleString('en-us', { month: 'short' });
  const yearValue = dateObject.getFullYear();
  const time = dateObject.toLocaleTimeString();


  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName} ${yearValue} ${time}`;

  return formattedDate;
}
const DAT=mergeDataAndSalesWithPrices(DATA, DATASALES,noMarkupPercentage,taxPercentage)

//first ver
// function mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage) {
//   const mergedDataSales = JSON.parse(JSON.stringify(dataSales));

//   mergedDataSales.forEach(sale => {
//     const matchingProduct = data.find(product => {
//       const normalizedTitle = sale["title"].toLowerCase().replace(/\s/g, '');
//       const normalizedProductName = product.productName.toLowerCase().replace(/\s/g, '');

//       return normalizedProductName.includes(normalizedTitle);
//     });

//     if (matchingProduct) {
//       // Parse the product price as a float, and check if it's a valid number
//       const soldForPrice = parseFloat(matchingProduct.price);

//       if (!isNaN(soldForPrice)) {
//         // Deduct noMarkup percentage
//         const untaxedPrice = soldForPrice * (1 - noMarkupPercentage / 100);

//         // Deduct tax percentage
//         const wholesalePrice = untaxedPrice * (1 - taxPercentage / 100);

//         // Append the new properties to the sale object
//         sale["price sold for"] = soldForPrice.toFixed(2);
//         sale["price untaxed"] = untaxedPrice.toFixed(2);
//         sale["price wholesale"] = wholesalePrice.toFixed(2);
//       } else {
//         // Handle the case where the price cannot be parsed as a valid number
//         console.error(`Invalid price for product: ${matchingProduct.productName}`);
//       }
//     }
//   });
// console.log(mergedDataSales)
//   return mergedDataSales;
// }

// function mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage) {
//   const mergedDataSales = JSON.parse(JSON.stringify(dataSales));

//   mergedDataSales.forEach(sale => {
//     const matchingProduct = data.find(product => {
//       const normalizedTitle = sale["title"].toLowerCase().replace(/\s/g, '');
//       const normalizedProductName = product.productName.toLowerCase().replace(/\s/g, '');

//       return normalizedProductName.includes(normalizedTitle);
//     });

//     if (matchingProduct) {
//       // Parse the product price as a float, and check if it's a valid number
//       const soldForPrice = parseFloat(matchingProduct.price);

//       if (!isNaN(soldForPrice)) {
//         // Deduct noMarkup percentage
//         const markupPrice = soldForPrice * (noMarkupPercentage / 100);
//         const untaxedPrice = soldForPrice - markupPrice;

//         // Deduct tax percentage
//         const wholesalePrice = untaxedPrice * (1 - taxPercentage / 100);

//         // Append the new properties to the sale object
//         sale["price sold for"] = soldForPrice.toFixed(2);
//         sale["price untaxed"] = untaxedPrice.toFixed(2);
//         sale["price wholesale"] = wholesalePrice.toFixed(2);
//       } else {
//         // Handle the case where the price cannot be parsed as a valid number
//         console.error(`Invalid price for product: ${matchingProduct.productName}`);
//       }
//     }
//   });

//   console.log(mergedDataSales);
//   return mergedDataSales;
// }
//attempt number..... i lost count
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

  console.log(mergedDataSales);
  return mergedDataSales;
}



function calculateExpiredProductsTotal(data) {
  // Get the current date
  const currentDate = new Date();

  // Filter expired products
  const expiredProducts = data.filter(product => {
    const expirationDate = new Date(product.expires);
    return expirationDate < currentDate;
  });

  // Calculate the sum of parsed "qty" multiplied by their price for expired products
  const total = expiredProducts.reduce((acc, product) => {
    const parsedQty = parseInt(product.qty, 10);
    const parsedPrice = parseFloat(product.price);

    // Check if parsing is successful before performing calculations
    if (!isNaN(parsedQty) && !isNaN(parsedPrice)) {
      return acc + parsedQty * parsedPrice;
    }

    return acc;
  }, 0);

  return total.toFixed(2);
}

//profit?
// function calculateProfit(data, dataSales, noMarkupPercentage, taxPercentage, expiredAmount) {
//   // Use the mergeDataAndSalesWithPrices function to get the updated sales data
//   const mergedDataSales = mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage);

//   // Calculate the total cost based on the expired amount
//   const cost = parseFloat(expiredAmount);

//   // Calculate the total revenue from sales
//   const revenue = mergedDataSales.reduce((acc, sale) => {
//     const parsedPrice = parseFloat(sale["price wholesale"]);
// // const parsedPrice = parseFloat(sale["price wholesale"]);
//     // Check if parsing is successful before performing calculations
//     if (!isNaN(parsedPrice)) {
//       return acc + parsedPrice;
//     }

//     return acc;
//   }, 0);

//   // Calculate the profit by subtracting costs from revenue
//   const profit = revenue - cost;

//   return profit.toFixed(2);
// }

//verson 2
// function calculateProfit(data, dataSales, noMarkupPercentage, taxPercentage, expiredAmount) {
//   // Use the mergeDataAndSalesWithPrices function to get the updated sales data
//   const mergedDataSales = mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage); // Assuming no markup for profit calculation

//   // Calculate the total cost based on the expired amount
//   const cost = parseFloat(expiredAmount);

//   // Assuming the selling price is fixed for all products
//   const fixedSellingPrice = parseFloat(mergedDataSales[0]["price"]); // Assuming the selling price is the same for all products
//   const parsedPrice = parseFloat(sale["price wholesale"])
//   if (isNaN(parsedPrice)) {
//     console.error("Invalid selling price.");
//     return 0; // or handle accordingly
//   }

//   // Calculate the profit as a percentage of the fixed selling price
//   const profitPercentage = 1 + noMarkupPercentage / 100; // Adding 1 to represent 100% + noMarkupPercentage
//   const profit = (fixedSellingPrice - cost) * profitPercentage;

//   return profit.toFixed(2);
// }
//profit version 3

function calculateProfit(data, dataSales, noMarkupPercentage, taxPercentage, expiredAmount) {
  // Use the mergeDataAndSalesWithPrices function to get the updated sales data
 // const mergedDataSales = mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage);

  // Calculate the total cost based on the expired amount
  //const cost = parseFloat(expiredAmount) + calculateTotalTax(mergedDataSales);

  // Calculate the total revenue from sales
  //const revenue = calculateTotalWholesalePrice(mergedDataSales);

  // Calculate the profit by subtracting costs from revenue
 // const profit = revenue - cost;

 // return profit.toFixed(2);
 var acc=[];
 var sum=0 // this is the sum of the costs
var taxed=0;
var margined=0;
var ret=0;
var merged=mergeDataAndSalesWithPrices(data, dataSales, noMarkupPercentage, taxPercentage);
 merged.map((e)=>{sum=sum+parseFloat(e["price wholesale"]) ,console.log(e)})
 taxed = sum * (taxPercentage/100);
 margined= sum* (noMarkupPercentage/100);
 ret = 0-taxed+margined;
 return ret.toFixed(2);

}

// Helper function to calculate the total wholesale price
function calculateTotalWholesalePrice(mergedDataSales) {
  return mergedDataSales.reduce((acc, sale) => {
    const parsedWholesalePrice = parseFloat(sale["price wholesale"]);

    // Check if parsing is successful before performing calculations
    if (!isNaN(parsedWholesalePrice)) {
      return acc + parsedWholesalePrice;
    }

    return acc;
  }, 0);
}

// Helper function to calculate the total tax
function calculateTotalTax(mergedDataSales) {
  return mergedDataSales.reduce((acc, sale) => {
    const parsedTax = parseFloat(sale["price sold for"] * (taxPercentage / 100));
// console.log(parsedTax)
// console.log(sale["price"])
// console.log(mergedDataSales)
    // Check if parsing is successful before performing calculations
    if (!isNaN(parsedTax)) {
    
      return acc + parsedTax;
    }
    return acc;
  }, 0);
}


function calculateTotalWholesale(data, taxPercentage, marginPercentage) {
  // Calculate the total wholesale amount based on the tax and margin deductions
  const totalWholesale = data.reduce((acc, product) => {
    const parsedQty = parseInt(product.qty, 10);
    const parsedPrice = parseFloat(product.price);

    // Check if parsing is successful before performing calculations
    if (!isNaN(parsedQty) && !isNaN(parsedPrice)) {
      const wholesaleAmount = parsedQty * (parsedPrice * (1 - taxPercentage / 100) * (1 - marginPercentage / 100));
      return acc + wholesaleAmount;
    }

    return acc;
  }, 0);

  return totalWholesale.toFixed(2);
}



function calculateTotalWholesaleWithSales(data, dataSales, taxPercentage, noMarkupPercentage) {
  // Get the current date
  const currentDate = new Date();

  // Calculate the total wholesale amount based on the tax and noMarkupPercentage deductions
  const totalWholesale = data.reduce((acc, product) => {
    // Skip products that are deemed expired
    const expirationDate = new Date(product.expires);
    if (expirationDate >= currentDate) {
      // Calculate the frequency of the product in dataSales
      const frequency = dataSales.filter(sale => sale["title"].toLowerCase() === product.productName.toLowerCase()).length;

      // Calculate the quantity to be considered for the wholesale calculation
      const adjustedQty = parseInt(product.qty, 10) - frequency;

      // Check if the adjusted quantity is greater than zero before performing calculations
      if (adjustedQty > 0) {
        const parsedPrice = parseFloat(product.price);

        // Check if parsing is successful before performing calculations
        if (!isNaN(parsedPrice)) {
          const wholesaleAmount = adjustedQty * (parsedPrice * (1 - taxPercentage / 100) * (1 - noMarkupPercentage / 100));
          return acc + wholesaleAmount;
        }
      }
    }

    return acc;
  }, 0);

  return totalWholesale.toFixed(2);
}

// function exportToExcel(){
//     const dataArray= dateEnd.length?sort(DAT,dateStart,fromT,dateEnd,toT):DAT;
//     const data = dataArray.map(obj => Object.values(obj));
//     const headerRow = Object.keys(dataArray[0]);
//     data.unshift(headerRow);
//     const footerRow = [`total Not Sold:  ${calculateTotalWholesaleWithSales(DATA,data, taxPercentage, noMarkupPercentage)}`,
//      `total Costs:  ${calculateTotalWholesale(DATA,taxPercentage,noMarkupPercentage)}`,
//       `expired: ${calculateExpiredProductsTotal(DATA)}`,
//     `profit(+)/losses(-): ${calculateProfit(DATA,data,noMarkupPercentage,taxPercentage,calculateExpiredProductsTotal(DATA))}`];
//     data.push(footerRow);

//     const ws=XLSX.utils.aoa_to_sheet(data);
//     const wb=XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb,ws,'Sheet1')

//     const wbBlob = XLSX.write(wb,{bookType:'xlsx',type:'blob'});

//     const downloadLink=document.createElement('a');
//     const url=URL.createObjectURL(wbBlob);
//     downloadLink.href=url;
//     downloadLink.download=`${Date().slice(0,23)}.xlsx`;
//     document.body.appendChild(downloadLink);

//     downloadLink.click();

//     URL.revokeObjectURL(url);
//     document.body.removeChild(downloadLink);
//   }




 

 

  const handleExcel=()=>{

 
    //dataArray
    const dataArray = dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT;
    const data = dataArray.map(obj => Object.values(obj));
    //footerRow
    const footerRow = [
      //`total Not Sold:  ${calculateTotalWholesaleWithSales(DATA,dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT,taxPercentage,noMarkupPercentage)}`,
      `taxes due:  ${dateEnd.length?calculateTotalTax(sort(DAT,dateStart,fromT,dateEnd,toT)).toFixed(2):calculateTotalTax(DAT).toFixed(2)} `,
      `total Costs:  ${calculateTotalWholesale(DATA,taxPercentage,noMarkupPercentage)}`,
      `expired: ${calculateExpiredProductsTotal(DATA)}`,
      `profit(+)/losses(-): ${calculateProfit(DATA,dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT,noMarkupPercentage,taxPercentage,calculateExpiredProductsTotal(DATA))}`
    ];
//do not forget to add signature
 
   

  
    const headerRow = Object.keys(dataArray[0]);
    data.unshift(headerRow);


    data.push(footerRow);


    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

 
    const wbBlob = XLSX.writeFileXLSX(wb,`${Date().slice(0,21)}.xlsx`);

  
    const downloadLink = document.createElement('a');
    //const url = URL.createObjectURL(wbBlob);
   // downloadLink.href = url;
    downloadLink.download =`${Date().slice(0,23)}.xlsx`;
    document.body.appendChild(downloadLink);

 
    downloadLink.click();

    
    //URL.revokeObjectURL(url);
    //document.body.removeChild(downloadLink);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={false}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Accountant
            </Typography>
            <IconButton color="inherit" onClick={()=>{setTheme(changeTheme(props.theme))}}>
              <Badge badgeContent={0} color="secondary">
               {props.theme==="dark"?<Brightness5 />:<DarkMode/>}
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={()=>{setAccdrop(!accdrop)}}>
              <Badge badgeContent={0} color="secondary">
                <AccountCircle />
              </Badge>
            </IconButton>

           {/* <AccDrop/>*/}
{/*prompt dialog for when opening from manager view*/console.log("staffdata",staffdata)}
{Object.keys(staffdata).length?<PromptDialog open={promptOpen} handleExcelThroughQuery={handleExcelThroughQuery} setPromptOpen={setPromptOpen} setAccountantCredentials={setAccountantCredentials} setAccountantValidated={setAccountantValidated} staffdata={staffdata}/>:null}
           <Popover style={{marginTop:30}}
        id="AccDrop"
        open={accdrop}
       // anchorEl={anchorEl}
        onClose={()=>{setAccdrop(false)}}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
  
       // anchorPosition={{top:50,left:10}}
      >
        <AccDrop logout={unload} creds={props.creds}/>
       {/* <Typography sx={{ p: 2 }}></Typography> */}
      </Popover>

{/* <IconButton
              edge="end"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '0px',
                ...(open && { display: 'none' }),
              }}
            >
              <EditCalendar />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        

        <Drawer variant="temporary" open={false}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            {/* <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton> */}
          </Toolbar>
          <Divider />
          <List component="nav">
            {/*mainListItems*/}
            <React.Fragment>
    <ListItemButton onClick={()=>{navigation.navigate("Dashboard")}}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Insights" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LocalShipping />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Inventory />
      </ListItemIcon>
      <ListItemText primary="Stock" />
    </ListItemButton>
  </React.Fragment>
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            
          }}
        
        >
          <Toolbar />
         <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders dateStart={dateStart.length?dateStart:""}dateEnd={dateEnd.length?dateEnd:""}
                  tstart={fromT.length?fromT:""} tend={toT.length?toT:""}
                  noMarkupPercentage={noMarkupPercentage}
                  setNoMarkupPercentage={setNoMarkupPercentage}
                  taxPercentage={taxPercentage}
                  taxDue={dateEnd.length?calculateTotalTax(sort(DAT,dateStart,fromT,dateEnd,toT)):calculateTotalTax(DAT)}
                  setTaxPercentage={setTaxPercentage}
                  profit={calculateProfit(DATA,dateEnd.length ? sort(DAT,dateStart,fromT,dateEnd,toT) : DAT,noMarkupPercentage,taxPercentage,calculateExpiredProductsTotal(DATA))}
                  expiredStock={calculateExpiredProductsTotal(DATA)}
                  totalNotSold={calculateTotalWholesaleWithSales(DATA, DATASALES, taxPercentage, noMarkupPercentage)}
                  totalCost={calculateTotalWholesale(DATA,taxPercentage,noMarkupPercentage)} props={dateEnd.length?sort(DAT,dateStart,fromT,dateEnd,toT):DAT}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
         

        </Box>



        
        <DrawerRight position="absolute" variant="permanent" open={DateOpen}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDateDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">


            {/*main list fragment*/}
          <React.Fragment>
    <ListItemButton onClick={toggleDateDrawer}>
        <ListItemIcon>
    {!DateOpen?<ArrowBack/>:<East/>}
        </ListItemIcon>
    </ListItemButton>
    <ListItemButton onClick={()=>{dateSelect(selecting[0])}}>
      <ListItemIcon>
      <Badge badgeContent={fromT.length?1:0} variant="dot"  color={fromT.length?"success":"error"}>
        <Update />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Time Start" />
    </ListItemButton >{DateOpen&&selectingTs?<div style={{height:380}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
    <StaticTimePicker onChange={(e)=>{setFromT((e["$d"].toString()).slice(16,21)),console.log("fromtime",(e["$d"].toString()).slice(16,21))}} defaultValue={dayjs()} ampm={false} slots={{"actionBar":"disabled"}}/>
    </LocalizationProvider></div>:null}
    <ListItemButton onClick={()=>{dateSelect(selecting[1])}}>
      <ListItemIcon>
      <Badge badgeContent={toT.length?1:0} variant="dot" color={toT.length?"success":"error"}>
        <UpdateDisabled />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Time End" />
    </ListItemButton>
    {DateOpen&&selectingTe?<div style={{height:380}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <StaticTimePicker onChange={(e)=>{setToT((e["$d"].toString()).slice(16,21)),console.log("totime",(e["$d"].toString()).slice(16,21))}} defaultValue={dayjs()} ampm={false} slots={{"actionBar":"disabled"}}/>
    </LocalizationProvider></div>:null}
    
  </React.Fragment>




            <Divider sx={{ my: 1 }} />
            <React.Fragment>

    <ListItemButton onClick={()=>{dateSelect(selecting[2])}}>
      <ListItemIcon>
      <Badge badgeContent={dateStart.length?1:0} variant="dot" color={dateStart.length?"success":"error"}>
        <DateRange />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Start Date" />
    </ListItemButton>
    {DateOpen&&selectingDs?<div style={{height:380}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={(e)=>{setDateStart((e["$d"].toString()).slice(0,15)),console.log("datestart",(e["$d"].toString()).slice(0,15))}}/>
    </LocalizationProvider></div>:null}
    <ListItemButton onClick={()=>{dateSelect(selecting[3])}}>
      <ListItemIcon>
      <Badge badgeContent={dateEnd.length?1:0} variant="dot" color={dateEnd.length?"success":"error"}>
        <EventAvailable />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="End Date" />
    </ListItemButton>{DateOpen&&selectingDe?<div style={{height:300}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar onChange={(e)=>{setDateEnd((e["$d"].toString()).slice(0,15)),console.log("dateEnd",(e["$d"].toString()).slice(0,15))}}/>
    </LocalizationProvider></div>:null}
   
  </React.Fragment>
  <footer style={{color: "gray", position: "fixed", bottom: 0, right:0}}>
  <img onClick={handleExcel} src={require('./exel.png')} height={64} width={64}/>
  <center>Export...</center>
</footer>
          </List>
        </DrawerRight>
      </Box>
    </ThemeProvider>
    
  );
}