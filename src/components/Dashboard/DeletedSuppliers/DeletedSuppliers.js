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
import { Image } from 'react-native';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CardMedia from '@mui/material/CardMedia'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import NewGrid from './NewGrid';
import { AutoDelete,East,ArrowBack, DateRange, EventAvailable, Inventory, LocalShipping, QuestionMark, Restore, Update, UpdateDisabled, Person, Task, Mail, Highlight, Pin, Phone, Scale } from '@mui/icons-material';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GridCard from './GridCard';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { RightmainListItems, RightsecondaryListItems } from './RightListItems';
import Orders from './Orders';
import { AccountCircle, Brightness5, DarkMode, EditCalendar } from '@mui/icons-material';
import AccDrop from './AccDrop';
import { Popover } from '@mui/material';
import SupplierDialog from './AddDialog';
import UpdateDialog from './UpdateDialog';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LINK_TO_BACKEND } from '../../../var';
import {useSelector} from 'react-redux'
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
export default function DeletedSuppliers(props) {
  const selecting=["timeStart","timeEnd","dateStart","dateEnd"]
  const [Highlight,setHighlight]=useState({})
  const [data,setData]=useState([])
  const [selectingTs,setSTS]=useState(false);
  const [selectingTe,setSTE]=useState(false);
  const [selectingDs,setSDS]=useState(false);
  const [selectingDe,setSDE]=useState(false);
  const [isUpdating,setIsUpdating]=useState(false);
  const [toUpdate,setToUpdate]=useState({})
  const dateSelect=(query)=>{
if (query==="timeStart"){setSTS(true),setSTE(false),setSDS(false),setSDE(false)}
else if (query==="timeEnd"){setSTS(false),setSTE(true),setSDS(false),setSDE(false)}
else if (query==="dateStart"){setSTS(false),setSTE(false),setSDS(true),setSDE(false)}
else if (query==="dateEnd"){setSTS(false),setSTE(false),setSDS(false),setSDE(true)}
  }
  const [theme,setTheme]=React.useState("light")
  const [open, setOpen] = React.useState(true);
  const [dialogOpen,setDialogOpen]=React.useState(false);
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
  //const dds=useSelector(state=>state.datadeletedstock)
  const ddsupp=useSelector(state=>state.datadeletedsuppliers)
  const onloadStaff=async ()=>{
    await axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}deletedsuppliers/seeDeletions`
    }).then((response)=>{
        console.log(response)
      
        var toBe=[]
        response.data.map((e)=>{toBe.push({id:e.iddprovider,companyname:e.companyname,providerImage:e.providerImage,email:e.email,phoneNumber:e.phoneNumber})});
       
        console.log(toBe)
       
       setData(toBe)
    

       console.log(data)
       
  })
 // setData(ddsupp.value.length?ddsupp.value:[])
}
  useEffect (()=>{onloadStaff(),AsyncStorage.setItem("screen","DeletedSuppliers")},[])
  const unload=async ()=>{
    const val= await AsyncStorage.removeItem('tokenCookie');
    if (val!==null){return props.cb("")}
  
   
  }
var col=[];
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
              Deleted Suppliers
            </Typography>
             <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
             // onClick={()=>{props.setSupplierQuery(),navigation.navigate("Accountant")}}
              onClick={()=>{if( data.length){data.map((e)=>{col.push(e)}), props.setSupplierQuery(col),navigation.navigate("Accountant")}else alert("no deletions to wipe")}}

            >
              <DeleteForeverIcon />
           {/* <img  src={require("./truck-light.png")} height={22} width={21}/> */}
            </IconButton>
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
            <Grid item xs={12}>
             
              {/* Recent Orders */}
              {/* {data.map((e)=>{return (
                <Grid item xs={8} md={6} lg={4} xl={3}>
                
<GridCard companyname={e.companyname} id={e.idprovider} email={e.email} providerImage={e.providerImage} hl={e} cb={setHighlight}/>
              
              </Grid>)
              })
              
} */}
{Object.keys(data).length?<NewGrid data={data} callbackUpdate={setIsUpdating} updateHook={setToUpdate}/>:null}
              {/*^^^^end of Recent Order, or what remained of it*/}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>


        <SupplierDialog open={dialogOpen} cb={setDialogOpen}/>
        <UpdateDialog open={isUpdating} cb={setIsUpdating} update={toUpdate}/>
      </Box>

      
    </ThemeProvider>
    
  );
}