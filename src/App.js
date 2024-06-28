/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { StatusBar } from 'expo-status-bar';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonUsage from './components/dummy';
import SignInSide from './components/signIn';
import SignUp from './components/signup';
import Dashboard from './components/Dashboard/Dashboard';
import Verification from "./components/verification";
import Sales from './components/Dashboard/Sales/Sales';
import Staff from './components/Dashboard/Staff/Staff';
import Suppliers from './components/Dashboard/Suppliers/Suppliers';
import Stock from './components/Dashboard/Stock/Stock';
import Accountant from './components/Dashboard/Accountant/Accountant';
import Guest from './components/guest';
import Admin from './components/admin';
import DeletedSuppliers from './components/Dashboard/DeletedSuppliers/DeletedSuppliers.js';
import Deleted from './components/Dashboard/Deleted/Deleted.js';
//import Admin from './components/admin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingPage from './components/loading.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



import { useSelector, useDispatch } from 'react-redux'
import { reduxfetch } from './redux/DataSales.js';
import { reduxfetchStock } from './redux/DataStock.js';
import { reduxfetchSuppliers } from './redux/DataSuppliers.js';
import { reduxfetchDeletedStock } from './redux/DataDeletedStock.js';
import { reduxfetchDeletedSuppliers } from './redux/DataDeletedSuppliers.js';
//import store from './store.js';
function App() {

 const dispatch=useDispatch()
useEffect(()=>{ dispatch(reduxfetch())
  dispatch(reduxfetchStock())
  dispatch(reduxfetchSuppliers())
  dispatch(reduxfetchDeletedStock())
  dispatch(reduxfetchDeletedSuppliers())
 
 },[])



  const [token,settoken]=useState("");
  const Stack=createNativeStackNavigator();
  const [name,setName]=useState("");
  const [role,setRole]=useState("");
  const [email,setEmail]=useState('');
  const [id,setId]=useState("");
  const [theme,settheme]=useState("light")
  const [query,setQuery]=useState([])
  const [supplierQuery,setSupplierQuery]=useState([]);
  const [currentScreen,setCurrentScreen]=useState("");
  //add supplier query
  // const registerServiceWorker = async () => {
  //   if ("serviceWorker" in navigator) {
  //     try {
  //       const registration = await navigator.serviceWorker.register("/sw.js", {
  //         scope: "/",
  //       });
  //       if (registration.installing) {
  //         console.log("Service worker installing");
  //       } else if (registration.waiting) {
  //         console.log("Service worker installed");
  //       } else if (registration.active) {
  //         console.log("Service worker active");
  //       }
  //     } catch (error) {
  //       console.error(`Registration failed with ${error}`);
  //     }
  //   }
  // };
  const defaultTheme = createTheme({palette:{mode:`${theme}`}});
 async function setTheme(input){
//var palette= await AsyncStorage.getItem("theme")
try {
  const palette = await AsyncStorage.getItem('theme');
  if (palette !== null) {
   if (palette!==input){AsyncStorage.setItem('theme',input),settheme(input)}
  }
  else {AsyncStorage.setItem('theme',input)}
} catch (error) {
  const mute = error
}
 }
 async function autoTheme(){
  //var palette= await AsyncStorage.getItem("theme")
  try {
    const palette = await AsyncStorage.getItem('theme');
    if (palette !== null) {
     settheme(palette)
    }
    else {AsyncStorage.setItem('theme',"light")}
  } catch (error) {
    const mute = error
  }
   }



   useEffect(()=>{autoTheme()},[])
   useEffect(()=>{autonav()},[])
   //useEffect(()=>{})
//registerServiceWorker()
async function autonav(){
  try {
    const currentScrn = await AsyncStorage.getItem('screen');
    if (currentScrn !== null) {
     setCurrentScreen(currentScrn)
   
    }
    else {AsyncStorage.setItem('screen',role==="accountant"?"Accountant":role==="admin"?"Admin":role==="manager"?"Dashboard":role==="guest"?"Guest":"Login")}
  } catch (error) {
    const mute = error
  }
}

// const dispatch=useDispatch()
// dispatch(reduxfetch())

  return (

    <ThemeProvider theme={defaultTheme}><CssBaseline />{
      
    // <div className="App">
    //   <header className="App-header">
    //     {
      token.length?
<NavigationContainer>
  <Stack.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false}}>
    {role==="accountant"?<Stack.Screen name="Accountant" children={(cb)=><Accountant themeCB={setTheme} query={query} theme={theme} cb={settoken}  creds={{id:id,email:email,name:name,role:role}}/>}/>:
    role==="admin"?<Stack.Screen name="Admin" children={(cb)=><Admin themeCB={setTheme} theme={theme} cb={settoken} creds={{id:id,email:email,name:name,role:role}}     />}/>:
    role==="manager"?
    <>
    <Stack.Screen name="Dashboard" children={(cb)=><Dashboard currentScreen={currentScreen} themeCB={setTheme} theme={theme} cb={settoken} creds={{id:id,email:email,name:name,role:role}}/>}/>
    <Stack.Screen name="Sales" children={(cb)=><Sales  cb={settoken} themeCB={setTheme} theme={theme}   creds={{id:id,email:email,name:name,role:role}}     />}/>
    <Stack.Screen name="Staff" children={(cb)=><Staff cb={settoken} themeCB={setTheme} theme={theme}   creds={{id:id,email:email,name:name,role:role}}     />}/> 
    <Stack.Screen name="Suppliers" children={(cb)=><Suppliers cb={settoken} themeCB={setTheme} theme={theme} creds={{id:id,email:email,name:name,role:role}}/>}/> 
      <Stack.Screen name="Stock" children={(cb)=><Stock cb={settoken}  themeCB={setTheme} theme={theme}   creds={{id:id,email:email,name:name,role:role}}    />}/>
      <Stack.Screen name="Deleted" children={(cb)=><Deleted cb={settoken} setQuery={setQuery} themeCB={setTheme} theme={theme}   creds={{id:id,email:email,name:name,role:role}}   />}/>
      <Stack.Screen name="DeletedSuppliers" children={(cb)=><DeletedSuppliers cb={settoken} setSupplierQuery={setSupplierQuery} setQuery={setQuery} themeCB={setTheme} theme={theme}   creds={{id:id,email:email,name:name,role:role}}   />}/>
      <Stack.Screen name="Accountant" children={(cb)=><Accountant themeCB={setTheme} supplierQuery={supplierQuery} query={query} theme={theme} cb={settoken}  creds={{id:id,email:email,name:name,role:role}}/>}/>
      
</>
      :role==="guest"?
      <Stack.Screen name="Guest" children={(cb)=><Guest cb={settoken}  themeCB={setTheme} theme={theme}      />}/>:<Stack.Screen name='Loading' children={(cb)=><LoadingPage theme={theme} one={token.length}two={role}/>}/>
    }
  </Stack.Navigator>
</NavigationContainer>:
    // <View style={styles.container}>
    <NavigationContainer >
    <Stack.Navigator initialRouteName="Login"  screenOptions={{headerShown:false}}>
    <Stack.Screen name="Login" children={(cb)=><SignInSide theme={theme} cb={settoken} cb2={setEmail} sr={setRole} sn={setName} se={setEmail} si={setId}/>}/>
    <Stack.Screen name="Signup" children={(cb)=><SignUp theme={theme} cb={settoken}/>}/>
    <Stack.Screen name="Verification" children={(cb)=><Verification theme={theme} cb={settoken}/>}/>
    </Stack.Navigator>
    </NavigationContainer>
     //  <StatusBar style="auto" />
    // </View>
// }
//       </header>
//     </div>
 
  } </ThemeProvider>
  );
}

export default App;
