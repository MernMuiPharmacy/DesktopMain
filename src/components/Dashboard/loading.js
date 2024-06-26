/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
//import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function LinearIndeterminate(props) {
  //const defaultTheme = createTheme({palette:{mode:`${props.theme}`}});
  //setTimeout(async ()=>{if ((await props.one&&!await props.two)||(!await props.one&&await props.two)){window.location.reload(false)}},1500)
  return (
  
    <Box sx={{ width: '100%',height:'100%' }}>


      <LinearProgress />
    </Box>
  
  );
}