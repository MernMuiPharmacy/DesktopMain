/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'
import { LINK_TO_BACKEND } from '../var';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
var permutation=[];


axios({
    method:'get',
    headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}staff/getAllUsers`
}).then((response)=>{
    console.log(response)
  
    var toBe=[]
    response.data.map((e)=>{toBe.push({id:e.idstaff,name:e.name,role:e.role,email:e.email,activated:e.activationStatus})});
   
    console.log(toBe)
   
   permutation=toBe


 
   
}).catch((error)=>{var mute=error})



const datastaffSlice = createSlice({
  name: 'datastaff',
  initialState: {
    value: []
  },
//   disableimmer2: true ,
  //disableimmer:true,
  reducers: {
    reduxfetchStaff: state => {
              // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     
      
      //Object.defineProperty(permutation, 'length', { writable: true })
     
      //state.value=permutation
      //Object.defineProperty(state.value, 'length', { writable: true })
      state.value=permutation
     } ,
     reduxUpdateRole:async (state,action)=>{
        axios({
            method:'put',
            headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
            url:`${LINK_TO_BACKEND}staff/changeRole`,
            data:{name:action.payload.Highlight.name,newrole:action.payload.value.toLowerCase()}
        }).then((response)=>{
            console.log(response)
            window.location.reload(false)
           // setCreds({...creds,name:response.data.name,email:response.data.email,idstaff:response.data.idstaff,role:response.data.role})
        })
     },
     reduxUploadStaff:async (state,action)=>{
        axios({
            method:'post',
            headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
            url:`${LINK_TO_BACKEND}staff/insertThroughManager`,
            data:action.payload
        }).then((response)=>{
            console.log(response)
            window.location.reload(false)
        });
     },
     reduxRemoveStaff:async (state,action)=>{
      axios({
        method:'post',
        headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}staff/removeThroughManager`,
        data:{idstaff:action.payload}
    }).then((response)=>{
      window.location.reload(false)
      console.log(response)
  })
     },
     
    // decremented: state => {
    //   state.value -= 1
    // }
  }
})

export const { reduxfetchStaff,reduxUpdateRole,reduxRemoveStaff,reduxUploadStaff } = datastaffSlice.actions;
export default datastaffSlice.reducer
