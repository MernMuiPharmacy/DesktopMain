/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'
import { LINK_TO_BACKEND } from '../var';
import axios from 'axios';
var permutation=[];
var data=[];
var categories=[];


// axios({
//     method:'get',
//     //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
//     url:`${LINK_TO_BACKEND}deletedstock/seeDeletions`
// }).then((response)=>{
//     console.log(response)
  
//     var toBe=[]
//     response.data.map((e)=>{toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.deletedproviders,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})});
   
//     //console.log(toBe)
   
//    permutation.stock=toBe


//    //console.log(data)
   
// })
axios({
    method:'get',
    //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}deletedsuppliers/seeDeletions`
}).then((response)=>{
    console.log(response)
  
  //  var toBe=[]
  //  response.data.map((e)=>{toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.providers,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})});
   
   // console.log(toBe)
   
   permutation=response.data


   //console.log(data)
   
})



const datadeletedsuppliersSlice = createSlice({
  name: 'datadeletedsuppliers',
  initialState: {
    value: []
  },
//   disableimmer2: true ,
  //disableimmer:true,
  reducers: {
    reduxfetchDeletedSuppliers: state => {
              // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     
      
      //Object.defineProperty(permutation, 'length', { writable: true })
     
      //state.value=permutation
      //Object.defineProperty(state.value, 'length', { writable: true })
      state.value=permutation
     } ,
     reduxRemoveSupplierDeletion:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}deletedsuppliers/removeDeletion`,{companyname:action.payload}).then(()=>{window.location.reload(false)})
     },
     reduxWipeSupplierDeletions:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}deletedsuppliers/removeDeletion`,{companyname:action.payload})
     },
     reduxWipeSupplier:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}wipe/wipeSuppliers`,{companyname:action.payload})
     }
    // decremented: state => {
    //   state.value -= 1
    // }
  }
})

export const { reduxfetchDeletedSuppliers,reduxRemoveSupplierDeletion,reduxWipeSupplierDeletions,reduxWipeSupplier } = datadeletedsuppliersSlice.actions;
export default datadeletedsuppliersSlice.reducer
