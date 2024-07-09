/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import medicacom from "../assets/medicacom.gif"
import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { LINK_TO_BACKEND } from '../var';
import LinearIndeterminate from './Dashboard/loading';

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

// TODO remove, this demo shouldn't need to reset the theme.

//const defaultTheme = createTheme({palette:{mode:`${theme}`}});

export default function SignInSide({cb,sn,se,sr,si,theme}) {
 // const dispatch=useDispatch()
  const [isLoading,setIsLoading]=useState(true)
  const defaultTheme = createTheme({palette:{mode:`${theme}`}});
  const [credentials, setCredentials]=useState({useremail:'',userpass:''});
  const [parry,setParry]=useState(false)
  const storeData=async (value)=>{
    try{
await AsyncStorage.setItem('tokenCookie',value)
    } catch(e){
        window.location.reload(false)
    }
}
const onscreenload=async ()=>{
  const val= await AsyncStorage.getItem('tokenCookie');
  if (val!==null){ setParry(!parry); return cb(val)}
 
}
useEffect (()=>{onscreenload()},[])
  const navigation=useNavigation()
  const onloadUserCredentials=async ()=>{
    const val=await AsyncStorage.getItem('tokenCookie')
    if (val!==null){
    await axios({
        method:'get',
        headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}staff/getUser`
    }).then((response)=>{
        console.log(response);
        //setCreds({...creds,name:response.data.name,email:response.data.email,idstaff:response.data.idstaff,role:response.data.role})
        sn(response.data.name);
        se(response.data.email);
        sr(response.data.role);
        si(response.data.idstaff);
    });

  }

 }

 useEffect (()=>{onloadUserCredentials()},[parry])



  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCredentials({
      useremail: data.get('email'),
      userpass: data.get('password'),
    });
    var tobe={
      useremail: data.get('email'),
      userpass: data.get('password'),
    }
    axios
                  .post(`${LINK_TO_BACKEND}staff/login`,tobe)
                  .then((resp)=>{storeData(resp.data);cb(resp.data)
                  ;onloadUserCredentials();
                  // dispatch(reduxfetch());
                  // dispatch(reduxfetchStock());
                  // dispatch(reduxfetchSuppliers());
                  // dispatch(reduxfetchDeletedStock());
                  // dispatch(reduxfetchDeletedSuppliers());
                  
                 
                 
                  
                  })
                  .catch(error=>{
                    if(error){
                      alert(
                          'incorrect credentials',
                          'please check your email or password'
                      )}
                  })
  };
setTimeout(()=>{setIsLoading(false)},610)
  return (
    
    <ThemeProvider theme={defaultTheme}> <CssBaseline />
      {isLoading?<LinearIndeterminate/>:
      <Grid container component="main" sx={{ height: '100vh' }}>
       
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            height:"100vh",
            backgroundImage: `url(${medicacom})`,
            backgroundRepeat: 'repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={text=>setCredentials({...credentials,useremail:text})}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={text=>setCredentials({...credentials,userpass:text})}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <TouchableHighlight onPress={()=>{navigation.navigate("Verification")}}>
                  <Link  variant="body2">
                    Verify?
                  </Link>
                  </TouchableHighlight>
                </Grid>
                <Grid item>
                  <TouchableHighlight onPress={()=>{navigation.navigate("Signup")}}>
                  <Link  variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                  </TouchableHighlight>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
}
    </ThemeProvider>
  );
}