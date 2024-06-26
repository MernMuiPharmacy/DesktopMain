/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigation } from '@react-navigation/native';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

//import CssBaseline from '@mui/material/CssBaseline';
export default function LinearIndeterminate(props) {
 
const navigation=useNavigation();
if(props.two==="accountant"){navigation.navigate("Accountant")}
if(props.two==="manager"){navigation.navigate("Dashboard")}
  //setTimeout(async ()=>{if ((await props.one&&!await props.two)||(!await props.one&&await props.two)){window.location.reload(false)}},1500)
  return (
   
    <Box sx={{ width: '100%',height:'100%' }}>

 
      <LinearProgress />
    </Box>
 
  );
}