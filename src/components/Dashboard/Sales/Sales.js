/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
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

import { AutoDelete,East,ArrowBack, DateRange, EventAvailable, Inventory, LocalShipping, QuestionMark, Restore, Update, UpdateDisabled } from '@mui/icons-material';
import AsyncStorage from '@react-native-async-storage/async-storage';


//import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { RightmainListItems, RightsecondaryListItems } from './RightListItems';

import Orders from './Orders';

import { AccountCircle, Brightness5, DarkMode, EditCalendar } from '@mui/icons-material';
import AccDrop from './AccDrop';
import { Popover } from '@mui/material';
import { LINK_TO_BACKEND } from '../../../var';


import store from '../../../store';
import datasalesSlice from '../../../redux/DataSales';
import { reduxfetch } from '../../../redux/DataSales';
import { useSelector, useDispatch } from 'react-redux';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
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
export default function Sales(props) {

  
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
  const [theme,setTheme]=React.useState("light")
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

   
const ds=useSelector( state=>state.datasales)
console.log("STATE !!!!!!",ds)
// setDATASALES(ds.value)
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



    //store.subscribe(() => console.log("STATE AT ROOT!!!!!",store.getState()),
    //store.dispatch(reduxfetch()))



   //setDATASALES(ds.value)
   //console.log("store state",store.getState(),ds)
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
    const unload=async ()=>{
      const val= await AsyncStorage.removeItem('tokenCookie');
      if (val!==null){return props.cb("")}
   
    }
  
useEffect (()=>{onloadSales(),AsyncStorage.setItem("screen","Sales")},[])
  //dont forget to add the sales dynamically by use effect
  const [visibleStartDate,setvisibleStartDate]=useState(false);
  const [visibleEndDate,setvisibleEndDate]=useState(false);
  const [visibleStartTime,setVisibleStartTime]=useState(false);
  const [visibleEndTime,setVisibleEndTime]=useState(false);
  const [dateStart,setDateStart]=useState("")
  const [dateEnd,setDateEnd]=useState("")
  const [fromT,setFromT]=useState("")
  const [toT,setToT]=useState("")
const DATA=DATASALES
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
  return (
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
              Sales
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
      >
        <AccDrop logout={unload}creds={props.creds}/>
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
            <ListItemButton onClick={()=>{navigation.navigate("Dashboard"),AsyncStorage.setItem("screen","Dashboard")}}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Insights" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Sales"),AsyncStorage.setItem("screen","Sales")}}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Sales" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Staff"),AsyncStorage.setItem("screen","Staff")}}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Suppliers"),AsyncStorage.setItem("screen","Suppliers")}}>
      <ListItemIcon>
        <LocalShipping />
      </ListItemIcon>
      <ListItemText primary="Suppliers" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Stock"),AsyncStorage.setItem("screen","Stock")}}>
      <ListItemIcon>
        <Inventory />
      </ListItemIcon>
      <ListItemText primary="Stock" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("Deleted"),AsyncStorage.setItem("screen","Deleted")}}>
      <ListItemIcon>
        <AutoDelete />
      </ListItemIcon>
      <ListItemText primary="Deleted" />
    </ListItemButton>
    <ListItemButton onClick={()=>{navigation.navigate("DeletedSuppliers"),AsyncStorage.setItem("screen","DeletedSuppliers")}}>
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
             
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders props={dateEnd.length?sort(DATASALES,dateStart,fromT,dateEnd,toT):DATASALES}/>
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
          </List>
        </DrawerRight>



      </Box>

      
    </ThemeProvider>
    
  );
}