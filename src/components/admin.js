/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {useState,useEffect} from "react";
import { LINK_TO_BACKEND } from '../var';

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

import {Dimensions} from 'react-native'

import 'dayjs/locale/en-gb';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountCircle, Brightness5, DarkMode, EditCalendar } from '@mui/icons-material';
import AccDrop from './Dashboard/AccDrop';
import { Popover } from '@mui/material';

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



// TODO remove, this demo shouldn't need to reset the theme.

// TODO 2 change this into a state later, mostly based on the time of day? dont forget to use useEffect(based on hour change?) or else it wll be unchanging
export default function Admin(props) {
const [theme,setTheme]=React.useState("light");
  const [accdrop,setAccdrop]=React.useState(false);
 //const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
 const defaultTheme = createTheme({palette:{mode:theme}});
 const navigation=useNavigation();
async function unload(){
  const val= await AsyncStorage.removeItem('tokenCookie');
  if (val!==null){return props.cb("")}
 
}
 const changeTheme=(current)=>{
if (current==="light"){return "dark"}
else if (current==="dark"){return "light"}
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
            
           
          
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin
            </Typography>
            <IconButton color="inherit" onClick={()=>{setTheme(changeTheme(theme))}}>
              <Badge badgeContent={0} color="secondary">
               {theme==="dark"?<Brightness5 />:<DarkMode/>}
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={()=>{setAccdrop(!accdrop)}}>
              <Badge badgeContent={0} color="secondary">
                <AccountCircle />
              </Badge>
            </IconButton>
 <Popover style={{marginTop:30}}
        id="AccDrop"
        open={accdrop}

        onClose={()=>{setAccdrop(false)}}
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
      >
        <AccDrop logout={unload} creds={props.creds}/>
   
      </Popover>
          </Toolbar>
        </AppBar>
        

        <div style={{backgroundColor:"#ffffff",marginTop:70,alignContent:"center"}}>

<iframe src={LINK_TO_BACKEND+"status"} width={Dimensions.get('window').width} height={Dimensions.get('window').height} frameBorder="0"></iframe>
</div>

      </Box>


    </ThemeProvider>
    
  );
}