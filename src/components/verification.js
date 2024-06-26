/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigation}  from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-web';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LINK_TO_BACKEND } from '../var';

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

// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme();

export default function Verify(props) {
  const defaultTheme = createTheme({palette:{mode:`${props.theme}`}});
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      useremail: data.get('email'),
      ValidatorCode: data.get('Verification code'),
    });
var tosend={useremail: data.get('email'),
ValidatorCode: data.get('Verification code')}

axios
.post(`${LINK_TO_BACKEND}staff/verify`,tosend)
.then(resp=>{storeData(resp.data),console.log(resp),onscreenload(),alert("account verified! welcome to MERN_MUI_Pharmacy!"),window.location.reload(false)/*,navigation.navigate('Home')*/ /*,cb2(AsyncStorage.getItem('tokenCookie'))*/})
.catch(erre => {alert("Incorrect credentials","user already exists")})



  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('tokenCookie', value)
    } catch (e) {
      // saving error
    }
  }
  
  const onscreenload=async ()=>{
    const val= await AsyncStorage.getItem('tokenCookie');
    if (val!==null){return props.cb(val)}
   
  }
  
  const navigation=useNavigation()
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Activate Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Verification code"
                  label="Verification code"
                  type="password"
                  id="password"
                  autoComplete="Verification-code"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <TouchableHighlight onPress={()=>{navigation.navigate("Login")}}>
                <Link  variant="body2">
                  Already veridied? Sign in
                </Link>
                </TouchableHighlight>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}