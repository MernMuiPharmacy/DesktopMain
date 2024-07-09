/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
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
//import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import ActiveHrs from '../Charts/ActiveHours';
import StockCondition from '../Charts/StockCondition';
import StockShare from '../Charts/StockShare';
import IngredientShare from '../Charts/IngredientShare';
import ProvidersShare from '../Charts/ProvidersShare';
import MonthlySales from '../Charts/MonthlySales';
import { AccountCircle, Brightness5, DarkMode } from '@mui/icons-material';
import AccDrop from './AccDrop';
import { Popover } from '@mui/material';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import axios from 'axios';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Inventory, LocalShipping } from '@mui/icons-material';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutoDelete } from '@mui/icons-material';
import LinearIndeterminate from '../Dashboard/loading.js';
import { LINK_TO_BACKEND } from '../../var.js';
import {useSelector, useDispatch } from 'react-redux'
import { reduxfetch } from '../../redux/DataSales.js';
import { reduxfetchStock } from '../../redux/DataStock.js';
import { reduxfetchSuppliers } from '../../redux/DataSuppliers.js';
import { reduxfetchDeletedStock } from '../../redux/DataDeletedStock.js';
import { reduxfetchDeletedSuppliers } from '../../redux/DataDeletedSuppliers.js';

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

// TODO remove, this demo shouldn't need to reset the theme.

// TODO 2 change this into a state later, mostly based on the time of day? dont forget to use useEffect(based on hour change?) or else it wll be unchanging
export default function Dashboard(props) {
  //const dispatch=useDispatch()
  const unload=async ()=>{
    const val=AsyncStorage.removeItem('tokenCookie');
    if (val!==null){return props.cb("")}
   
  }
  const [isLoading,setIsLoading]=React.useState(true);
  setTimeout(() => {
    setIsLoading(false)  
  },1789);
  const [loading,setLoading]=React.useState(true)
  const [DATA,setDATA]=React.useState([]);
  const [DATASALES,setDATASALES]=React.useState([]);
  const [SUPPLIER_DATA,setSUPPLIER_DATA]=React.useState([]);
  
  const [theme,setTheme]=React.useState("light")
  const [open, setOpen] = React.useState(true);
  const [accdrop,setAccdrop]=React.useState(false);
 //const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
 const defaultTheme = createTheme({palette:{mode:props.theme}});
 const changeTheme=(current)=>{
if (current==="light"){props.themeCB("dark")}
else if (current==="dark"){props.themeCB("light")}
 }
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigation=useNavigation();
  // useEffect(()=>{ dispatch(reduxfetch())
  //   dispatch(reduxfetchStock())
  //   dispatch(reduxfetchSuppliers())
  //   dispatch(reduxfetchDeletedStock())
  //   dispatch(reduxfetchDeletedSuppliers())
   
  //  },[])

// const ds=useSelector(state=>state.datastock)
// const dsupp=useSelector(state=>state.datasuppliers)
// const dsa=useSelector(state=>state.datasales)
//console.log("DASHBOARD VALUES",ds,dsupp,dsa)
  const onloadData=async ()=>{
    await axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}stock/getAllStock`
    }).then((response)=>{
        console.log(response)
        var toBe=[]
        response.data.map((e)=>{toBe.push({productName:e.productName,productImage:e.productImage,price:e["price"],activeIngredient:e.activeIngredient,prescOnly:e.prescOnly,type:e.type,qty:e["qty"].toString(),expires:e.expires,refregerate:e.refrigerate,providerID:e["providers"].toString()})})
        setDATA(toBe);
    });
  //   var toBe=[]
  //  ds.value.data!==undefined?ds.value.data.map((e)=>{toBe.push({productName:e.productName,productImage:e.productImage,price:e["price"],activeIngredient:e.activeIngredient,prescOnly:e.prescOnly,type:e.type,qty:e["qty"].toString(),expires:e.expires,refregerate:e.refrigerate,providerID:e["providers"].toString()})}):null
  //   setDATA(toBe)
  //   console.log("DATASTOCK REDUX",toBe)
 }
const onloadSuppliers=async ()=>{
  await axios({
      method:'get',
      //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
      url:`${LINK_TO_BACKEND}suppliers/getAllSuppliers`
  }).then((response)=>{
      console.log(response)
      var toBe=[]
      response.data.map((e)=>{toBe.push({idprovider:e["idprovider"].toString(),companyname:e.companyname,email:e.email,phoneNumber:e.phoneNumber,providerImage:e.providerImage})})
      setSUPPLIER_DATA(toBe)
  });
//   var toBe=[];

//  dsupp.value.map((e)=>{toBe.push({idprovider:e["id"].toString(),companyname:e.companyname,email:e.email,phoneNumber:e.phoneNumber,providerImage:e.providerImage})})

//   setSUPPLIER_DATA(toBe)
//   console.log("DATASupp REDUX",toBe)
}
const onloadSales=async()=>{
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
  // var counter=1
  //     var toBe=[]
  //    dsa.value.map((e)=>{toBe.push({id:counter,title:e["productName"],date:formatDate(e["date"])}),counter++})
  //already formatted
  // setDATASALES(dsa.value)
  // console.log("DATASale REDUX",dsa.value)
  //already formatted
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
console.log("input date && formatted date :",inputDate,"??BARRIER BARRIER??",formattedDate)
  return formattedDate;
}

 useEffect (()=>{onloadData();onloadSuppliers();onloadSales();navigation.navigate(props.currentScreen)},[])

useEffect(()=>{
  if(DATA.length&&DATASALES.length&&SUPPLIER_DATA.length){setLoading(false)}
},[DATA,DATASALES,SUPPLIER_DATA])






 const mapRevenueEachMonth=(SALESARR,PRODARR)=>{
  var months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var revenues=[0,0,0,0,0,0,0,0,0,0,0,0];
  var res=[];
  SALESARR.map((e)=>{for (var i=0;i<months.length;i++)
    {if (months[i]===e["date"].slice(8,11)){
    var name=e.title
    var coll=0
  PRODARR.map((p)=>{if ((p.productName.toLowerCase()).includes(name.toLowerCase())){coll=coll+parseInt(p.price)}})
  revenues[i]=revenues[i]+coll
}}})

console.log("monthly revenue",{
  labels: months,
  datasets: [
    {
      data: revenues
    }
  ]
})
return (
{
  labels: months,
  datasets: [
    {
      data: revenues
    }
  ]
}
)
 }
 const mapActiveHours=(SELL,parry)=>{//parry when false returns day hours
  
  var reference=[{a:"01",b:"1AM"},{a:"02",b:"2AM"},{a:"03",b:"3AM"},{a:"04",b:"4AM"},{a:"05",b:"5AM"},{a:"06",b:"6AM"},{a:"07",b:"7AM"},{a:"08",b:"8AM"},{a:"09",b:"9AM"},{a:"10",b:"10AM"},{a:"11",b:"11AM"},{a:"12",b:"12PM"},{a:"13",b:"1PM"},{a:"14",b:"2PM"},{a:"15",b:"3PM"},{a:"16",b:"4PM"},{a:"17",b:"5PM"},{a:"18",b:"6PM"},{a:"19",b:"7PM"},{a:"20",b:"8PM"},{a:"21",b:"9PM"},{a:"22",b:"10PM"},{a:"23",b:"11PM"},{a:"00",b:"12AM"}]
  var hoursDay =["6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
  var hoursNight=["6PM","7PM","8PM","9PM","10PM","11PM","12AM","1AM","2AM","3AM","4AM","5AM"];
  var res={"1AM":0, "2AM":0, "3AM":0, "4AM":0, "5AM":0, "6AM":0, "7AM":0, "8AM":0, "9AM":0, "10AM":0 ,"11AM":0, "12PM":0, "1PM":0, "2PM":0 ,"3PM":0 ,"4PM":0, "5PM":0, "6PM":0 ,"7PM":0 ,"8PM":0 ,"9PM":0, "10PM":0, "11PM":0 ,"12AM":0};
SELL.map((e,i)=>{  reference.map((ss,ii)=>{ if (e.date.slice(17,19)===ss.a){ res[ss.b]+=1} })
    })   //(e.date.slice(17,19))
    console.log("Active hours :", {
      labels: hoursDay,
      datasets: [
        {
          data: [res["6AM"],res["7AM"],res["8AM"],res["9AM"],res["10AM"],res["11AM"],res["12PM"],res["1PM"],res["2PM"],res["3PM"],res["4PM"],res["5PM"]]
        }
      ]
    })
if (!parry){
    return (
      {
        labels: hoursDay,
        datasets: [
          {
            data: [res["6AM"],res["7AM"],res["8AM"],res["9AM"],res["10AM"],res["11AM"],res["12PM"],res["1PM"],res["2PM"],res["3PM"],res["4PM"],res["5PM"]]
          }
        ]
      }
    )
}
else if (parry){
  return (
    {
      labels: hoursNight,
      datasets: [
        {
          data: [res["6PM"],res["7PM"],res["8PM"],res["9PM"],res["10PM"],res["11PM"],res["12AM"],res["1AM"],res["2AM"],res["3AM"],res["4AM"],res["5AM"]]
        }
      ]
    }
  )
}
 }



 const mapCompetition=(SALES,PRODS,SUPPLY)=>{
  //it goes like this
  //take all sales, count repetitions
  //and then based on repetitions, rank the repetition
  //take the name of the first three ;
  //return them as dataset 
  var salenames=[];
  var prodnames=[];
  var permutation3=[];
  var providers=[];
  var prefinal=[];
  SALES.map((e)=>{salenames.push(e.title)})//salename now contains strings
                                           //,repeated strings
  PRODS.map((f)=>{ prodnames.push([f.productName,f.providerID])})
                   //prodnames now contains
                  //objects with two keys
  salenames.map((ee)=>{
    var counter=0
    for (var i=0;i<salenames.length;i++){//looks for repetitions
      if (ee===salenames[i]){counter = counter+1}
    }
    permutation3.push({prod:ee,count:counter})//permutation 3 holds 
                                              //repetitions for each
                                              //product
    })
    //this shall be the fetcher of the provider names
    prodnames.map((c,i)=>{  
      for (var i=0;i<SUPPLY.length;i++){
        if (c[0]===parseInt(SUPPLY[i]["idprovider"])){
          providers.push()
        }
      }
    })
    prodnames.map((ff)=>{
      for (var i=0;i<permutation3.length;i++){
        if (ff[0].toLowerCase().includes(permutation3[i])){//if prodnames[index] matches permutation3 at any index
        
        }
      }
    })
 }
 
 function generateProductSummaryWithGradient(DATASALES, DATA, SUPPLIER_DATA) {
  const productCount = {};

  // Count the number of sales for each product
  DATASALES.forEach((sale) => {
    if (sale.title in productCount) {
      productCount[sale.title]++;
    } else {
      productCount[sale.title] = 1;
    }
  });

  const productSummaryMap = DATA.reduce((summaryMap, product, index) => {
    const providerID = product.providerID;
    const providerInfo = SUPPLIER_DATA.find((provider) => provider.idprovider === providerID);

    if (providerInfo) {
      const { productName } = product;
      const providerName = providerInfo.companyname;
      const repetitions = productCount[productName] || 0;

      // Calculate the gradient value based on the index
      const gradientValue = index % 2 === 0 ? 0.5 : 0;

      // Check if an entry with the same providerName already exists
      if (summaryMap.has(providerName)) {
        // If the entry exists, add the repetitions and gradientValue
        const existingEntry = summaryMap.get(providerName);
        existingEntry.repetitions += repetitions + gradientValue;
      } else {
        // If the entry doesn't exist, create a new entry
        summaryMap.set(providerName, {
          productName,
          providerName,
          repetitions: repetitions + gradientValue,
        });
      }
    }

    return summaryMap;
  }, new Map());

  // Convert the Map values to an array
  const productSummary = Array.from(productSummaryMap.values());

  // Calculate the total repetitions
  const totalRepetitions = productSummary.reduce((total, product) => total + product.repetitions, 0);

  // Normalize repetitions so that the total sum is 1
  productSummary.forEach((product) => {
    product.repetitions /= totalRepetitions;
  });

  console.log("marketshare on a gradient pre-format", productSummary);
  console.log("marketshare on a gradient formatted", {
    labels: productSummary.map((product) => product.providerName), // optional
    data: productSummary.map((product) => product.repetitions),
  });

  return productSummary;
}



function generateProductSummaryGroupedByActiveIngredient(DATASALES,DATA,SUPPLIER_DATA) {
  const productCount = {};

  // Step 1: Count repetitions in DATASALES
  DATASALES.forEach((sale) => {
    if (sale.title in productCount) {
      productCount[sale.title]++;
    } else {
      productCount[sale.title] = 1;
    }
  });

  // Create a map to group products by activeIngredient and sum up repetitions
  const productGroups = new Map();

  // Step 2: Group products by activeIngredient and sum up repetitions
  DATA.forEach((product) => {
    const { activeIngredient } = product;
    const repetitions = productCount[product.productName] || 0;

    if (!productGroups.has(activeIngredient)) {
      productGroups.set(activeIngredient, 0);
    }

    productGroups.set(activeIngredient, productGroups.get(activeIngredient) + repetitions);
  });

  // Calculate the total sum of all repetitions
  const totalRepetitions = Array.from(productGroups.values()).reduce((sum, repetitions) => sum + repetitions, 0);

  // Create the final array of objects with summed and normalized repetitions grouped by activeIngredient
  const productSummary = [];

  productGroups.forEach((total, activeIngredient) => {
    const repetitions = total / totalRepetitions; // Calculate the normalized repetitions

    productSummary.push({
      activeIngredient,
      repetitions,
    });
  });

console.log("active ingredient sorting function",productSummary)
  // return ({
  //   labels: productSummary.map((product) => product.activeIngredient), 
  //   data: productSummary.map((product) => product.repetitions), 
  // })
  return productSummary
}

//sales for each product
function calculateTotalSales(DATASALES, DATA, SUPPLIER_DATA) {
  // Step 1: Count repetitions in DATASALES
  const productCount = {};
  DATASALES.forEach((sale) => {
    if (sale.title in productCount) {
      productCount[sale.title]++;
    } else {
      productCount[sale.title] = 1;
    }
  });

  // Step 2: Calculate total sales for each title
  const totalSales = [];
  Object.keys(productCount).forEach((title) => {
    const repetitions = productCount[title];

    // Find the product in DATA by title
    const product = DATA.find((item) => item.productName === title);

    if (product) {
      const price = parseFloat(product.price);
      const sales = repetitions * price;

      totalSales.push({
        label: title,
        sales,
      });
    }
  });

 // return totalSales;
 console.log("total sales pre-format",totalSales)
 let Labels=[]; 
 totalSales.map((e)=>{Labels.push(e.label)})
 let Sales=[];
 totalSales.map((e)=>{Sales.push(e.sales)})
 console.log("total sales formatted",{
  labels: Labels,
  datasets: [
    {
      data: Sales
    }
  ]
})
  return ({
    labels: Labels,
    datasets: [
      {
        data: Sales
      }
    ]
  })
}

//stock condition
function processProductData(DATA) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

  const productSummary = DATA.map((product) => {
    // Parse the "qty" string into an integer
    const qty = parseInt(product.qty, 10) || 0;

    // Parse the "expires" string into a Date object
    const expiresDateParts = product.expires.split('/');
    const expiresDate = new Date(`20${expiresDateParts[2]}`, expiresDateParts[1] - 1, expiresDateParts[0]);
    
    // Calculate the difference in months
    const monthsDifference = Math.round((expiresDate - currentDate) / (30 * 24 * 60 * 60 * 1000));

    // Determine the "condition" based on the difference in months
    let condition = "safe";
    if (monthsDifference <= 2 && monthsDifference >= 0) {
      condition = "close";
    } else if (monthsDifference < 0) {
      condition = "expired";
    }

    // Determine the "label" based on the "refregerate" boolean
    const label = product.refregerate ? "refrigerated" : "not refrigerated";

    return {
      label,
      condition,
      qty,
    };
  });

  
  function summarizeProducts(productSummary) {
    const result = {
      refrigerated: [0, 0, 0], // [safe sum, close sum, expired sum]
      nonRefrigerated: [0, 0, 0], // [safe sum, close sum, expired sum]
    };
  
    productSummary.forEach((product) => {
      const { label, condition, qty } = product;
      var [safeSum, closeSum, expiredSum] = label === "refrigerated" ? result.refrigerated : result.nonRefrigerated;
  
      switch (condition) {
        case "safe":
          safeSum += qty;
          break;
        case "close":
          closeSum += qty;
          break;
        case "expired":
          expiredSum += qty;
          break;
      }
  
      if (label === "refrigerated") {
        result.refrigerated = [safeSum, closeSum, expiredSum];
      } else {
        result.nonRefrigerated = [safeSum, closeSum, expiredSum];
      }
    });
  
    return result;
  }
  //return productSummary;
 var res=summarizeProducts(productSummary)
console.log("stock condition pre-pre-format:",res)
console.log("stock condition pre-format:",productSummary)
console.log("stock condition :",{
  labels: ["NonRef", "Refrigirated"],
  legend: ["safe", "close", "expired"],
  data: [
    [res.nonRefrigerated[0],res.nonRefrigerated[1],res.nonRefrigerated[2]],
    [res.refrigerated[0],res.refrigerated[1],res.refrigerated[2]]
  ],
  barColors: ["#61dbfb", "#eeeeee", "#61b0c0"]
})
  return ({
    labels: ["NonRef", "Refrigirated"],
    legend: ["safe", "close", "expired"],
    data: [
      [res.nonRefrigerated[0],res.nonRefrigerated[1],res.nonRefrigerated[2]],
      [res.refrigerated[0],res.refrigerated[1],res.refrigerated[2]]
    ],
    barColors: ["#61dbfb", "#eeeeee", "#61b0c0"]
  })
}


function calculateQtySumByCategory(DATASALES, DATA, SUPPLIER_DATA) {
  const qtySumByCategory = {};

  // Step 1: Create a map to group products by category and sum quantities
  DATA.forEach((product) => {
    const { productName, qty } = product;
    const category = product.type;

    // Parse the qty as a number
    const qtyNumber = parseFloat(qty) || 0;

    if (!qtySumByCategory[category]) {
      qtySumByCategory[category] = 0;
    }

    qtySumByCategory[category] += qtyNumber;
  });

  // Step 2: Create an array of objects with category and qtySum
  const result = Object.keys(qtySumByCategory).map((category) => ({
    category,
    qtySum: qtySumByCategory[category],
  }));
  function enhanceDataWithColors(data) {
    
    const colorMap = {
      Allergy: '#e67e22',
      vitamins: '#f1c40f ',
      Cardiovascular: '#a4de6c ',
      supplement: '#d0ed57 ',
      "Pain Relief": '#ffc658 ',
      Cholesterol: '#83da9d ',
      hydrocortison: '#82ca9d',
      Antibiotic: '#8dd1e1 ',
      "Mental Health": '#83a6ed',
      allergy: '#8dd1e1',
      'physical trauma': '#85c6ed ',
      'anti-inflammatory': '#84b6ed',
      Diuretic: '#8884d8',
      ointments: '#88a4d8',
      diabetes: '#8794d8',
      default: '#8884d8',
    };
  
    return data.map((item) => ({
      name: item.category,
      qtySum: item.qtySum,
      legendFontColor: '7F7F7F',
      legendFontSize: 15,
      color: colorMap[item.category] || colorMap.default,
    }));
  }
  
  // Example usage with the result of calculateQtySumByCategory:
  //const result = calculateQtySumByCategory(DATASALES, DATA, SUPPLIER_DATA);
  const enhancedResult = enhanceDataWithColors(result);
console.log("colorless stock share",result);
console.log("colorful stock share:",enhancedResult)
 // return result;
 return enhancedResult
}
// // Example usage:
// const DATA = [
//   {
//     productName: "Product A",
//     qty: "5",
//     expires: "15/12/23",
//     refregerate: true,
//   },
//   {
//     productName: "Product B",
//     qty: "10",
//     expires: "30/11/23",
//     refregerate: false,
//   },
//   // Add more products as needed
// ];

// const result = processProductData(DATA);
// console.log(result);


 
  const dataStacked = {
    labels: ["NonRef", "Refrigirated"],
    legend: ["expired", "close", "safe"],
    data: [
      [60, 60, 60],
      [30, 30, 60]
    ],
    barColors: ["#61b0c0", "#eeeeee", "#61dbfb"]
  };

 
  return (isLoading?<LinearIndeterminate theme={props.theme}/>:
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
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
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Insights
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


          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/*mainListItems*/}
            <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Insights" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Sales")}}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Staff")}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Suppliers")}}>
      <ListItemIcon>
        <LocalShipping />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Stock")}}>
      <ListItemIcon>
        <Inventory />
      </ListItemIcon>
      <ListItemText primary="Stock" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Deleted")}}>
      <ListItemIcon>
        <AutoDelete />
      </ListItemIcon>
      <ListItemText primary="Deleted" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("DeletedSuppliers")}}>
      <ListItemIcon>
        <AutoDelete />
      </ListItemIcon>
      <ListItemText primary="DeletedSuppliers" />
    </ListItemButton>
  </React.Fragment>
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
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
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart dat={DATASALES} d={DATA} s={SUPPLIER_DATA} />
                </Paper>
              </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits dat={DATASALES} d={DATA} s={SUPPLIER_DATA}/>
                </Paper>
              </Grid>
              {/*marketshare by provider*/}
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >
                  <ProvidersShare dat={generateProductSummaryWithGradient(DATASALES,DATA,SUPPLIER_DATA)}/>
                </Paper>
              </Grid>
            {/*marketshare by active ingredient*/}
            <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                  
                >
                  <IngredientShare dat={generateProductSummaryGroupedByActiveIngredient(DATASALES,DATA,SUPPLIER_DATA)} />
                </Paper>
              </Grid>
              {/*active hours*/}
              <Grid item xs={12} /*md={8} lg={9}*/>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <ActiveHrs dat={mapActiveHours(DATASALES,false)}/>
                </Paper>
              </Grid>
                  {/*Monthly Sales*/}
                  <Grid item xs={12} /*md={8} lg={9}*/>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <MonthlySales dat={mapRevenueEachMonth(DATASALES,DATA)} />
                </Paper>
              </Grid>
              {/*stock share*/}
              <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >
                  <StockShare dat={calculateQtySumByCategory(DATASALES, DATA, SUPPLIER_DATA)} />
                </Paper>
              </Grid>
            {/*stock condition*/}
            <Grid item xs={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 320,
                  }}
                >
                  <StockCondition dat={processProductData(DATA)}/>
                </Paper>
              </Grid>
              {/* Recent Orders PS use function from sales view */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders  dat={DATASALES}/>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}