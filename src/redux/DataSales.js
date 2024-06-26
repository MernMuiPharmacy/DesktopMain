/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'
import { LINK_TO_BACKEND } from '../var';
import axios from 'axios';
var permutation=[];
axios({
  method:'get',
  //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
  url:`${LINK_TO_BACKEND}sales/getAllSales`
}).then((response)=>{
  console.log(response)
  var counter=1
  var toBe=[]
  Object.defineProperty(toBe, 'length', { writable: true })
  response.data.map((e)=>{toBe.push({id:counter,title:e["productName"],date:formatDate(e["date"])}),counter++})
 // setDATASALES(toBe)
 // permutation=toBe
 permutation=toBe
}).catch(error => {
  throw(error)
})
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

const datasalesSlice = createSlice({
  name: 'datasales',
  initialState: {
    value: []
  },
//   disableimmer2: true ,
  //disableimmer:true,
  reducers: {
    reduxfetch: state => {
              // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     
      
      //Object.defineProperty(permutation, 'length', { writable: true })
     
      //state.value=permutation
      //Object.defineProperty(state.value, 'length', { writable: true })
      state.value=permutation
     } ,
     reduxWipeFromSales: (state,action)=>{
      axios.post(`${LINK_TO_BACKEND}wipe/wipeSales`,{productName:action.payload})
     }
    // decremented: state => {
    //   state.value -= 1
    // }
  }
})

export const { reduxfetch,reduxWipeFromSales } = datasalesSlice.actions;
export default datasalesSlice.reducer
