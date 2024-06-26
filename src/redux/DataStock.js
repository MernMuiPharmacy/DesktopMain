/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'
import { LINK_TO_BACKEND } from '../var';
import axios from 'axios';
var permutation=[];
var data=[];
var categories=[];

axios({
    method:'get',
    //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}stock/getAllStock`
}).then(async (response)=>{
  await axios({
    method:'get',
    //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}deletedstock/seeDeletions`
}).then((resp)=>{
    var eliminations=[]
    resp.data.map((e)=>{eliminations.push(e.productName)});


    console.log(response)
  
    var toBe=[]
    var cat=[]
    response.data.map((e)=>{if(!eliminations.includes(e.productName)){!cat.includes(e.type)?cat.push(e.type):null,toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.providers,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})}});
    console.log(toBe) 
   data=toBe
   categories=cat
   permutation={"data":data,"categories":categories}
console.log(data)
   
})
})



const datastockSlice = createSlice({
  name: 'datastock',
  initialState: {
    value: {}
  },
//   disableimmer2: true ,
  //disableimmer:true,
  reducers: {
    reduxfetchStock: state => {
              // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     
      
      //Object.defineProperty(permutation, 'length', { writable: true })
     
      //state.value=permutation
      //Object.defineProperty(state.value, 'length', { writable: true })
      state.value=permutation
     } ,
     reduxUpdateStock: (state,action)=>{
      axios.put(`${LINK_TO_BACKEND}stock/updateStock`,action.payload).then(()=>{window.location.reload(false)})

     },
     reduxUploadStock:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}stock/addStock`,action.payload).then(()=>{window.location.reload(false)})

     },
     reduxDeleteStock:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}deletedstock/addDeletion`,{productName:action.payload.productName,activeIngredient:action.payload.activeIngredient,type:action.payload.type,price:action.payload.price,prescOnly:action.payload.prescOnly,qty:action.payload.qty,expires:action.payload.expires,productImage:action.payload.productImage,refrigerate:action.payload.refrigerate,deletedproviders:action.payload.providers}).then(()=>{window.location.reload(false)})
     }
    // decremented: state => {
    //   state.value -= 1
    // }
  }
})

export const { reduxfetchStock,reduxUpdateStock,reduxUploadStock,reduxDeleteStock } = datastockSlice.actions;
export default datastockSlice.reducer
