/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'
import { LINK_TO_BACKEND } from '../var';
import axios from 'axios';
var permutation=[];
//var data=[];
//var categories=[];

// axios({
//     method:'get',
//     //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
//     url:`${LINK_TO_BACKEND}stock/getAllStock`
// }).then(async (response)=>{
//   await axios({
//     method:'get',
//     //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
//     url:`${LINK_TO_BACKEND}deletedstock/seeDeletions`
// }).then((resp)=>{
//     var eliminations=[]
//     resp.data.map((e)=>{eliminations.push(e.productName)});


//     console.log(response)
  
//     var toBe=[]
//     var cat=[]
//     response.data.map((e)=>{if(!eliminations.includes(e.productName)){!cat.includes(e.type)?cat.push(e.type):null,toBe.push({qty:e.qty,prescOnly:e.prescOnly,price:e.price,type:e.type,activeIngredient:e.activeIngredient,providers:e.providers,productName:e.productName,productImage:e.productImage,expires:e.expires,refrigerate:e.refrigerate})}});
//     console.log(toBe) 
//    data=toBe
//    categories=cat
//    permutation={"data":data,"categories":categories}
// console.log(data)
   
// })
// })
 axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}suppliers/getAllSuppliers`
    }).then(async (response)=>{
await axios({
        method:'get',
        //headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
        url:`${LINK_TO_BACKEND}deletedsuppliers/seeDeletions`
    }).then((resp)=>{
        var eliminations=[]
        resp.data.map((e)=>{eliminations.push(e.companyname)});
    
 
        console.log(response)
      
        var toBe=[]
        response.data.map((e)=>{if(!eliminations.includes(e.companyname)){toBe.push({id:e.idprovider,companyname:e.companyname,providerImage:e.providerImage,email:e.email,phoneNumber:e.phoneNumber})}});
        console.log(toBe) 
       permutation=toBe
   
       
  })
       
  })

const datasuppliersSlice = createSlice({
  name: 'datasuppliers',
  initialState: {
    value: []
  },
//   disableimmer2: true ,
  //disableimmer:true,
  reducers: {
    reduxfetchSuppliers: state => {
              // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
     
      
      //Object.defineProperty(permutation, 'length', { writable: true })
     
      //state.value=permutation
      //Object.defineProperty(state.value, 'length', { writable: true })
      state.value=permutation
     } ,
     reduxUpdateSupplier:(state,action)=>{
      axios.put(`${LINK_TO_BACKEND}suppliers/UpdateSupplier`,action.payload).then(()=>{window.location.reload(false)})
     },
     reduxDeleteSupplier:(state,action)=>{
      action.payload.itemsUnderSupplier.map((e)=>{ axios.post(`${LINK_TO_BACKEND}deletedstock/addDeletion`,e)}); 
    axios.post(`${LINK_TO_BACKEND}deletedsuppliers/addDeletion`,{idprovider:action.payload.props.id,companyname:action.payload.props.companyname,email:action.payload.props.email,phoneNumber:action.payload.props.phoneNumber,providerImage:action.payload.props.providerImage}).then(()=>{window.location.reload(false)})
     },
     reduxUploadSupplier:(state,action)=>{
      axios.post(`${LINK_TO_BACKEND}suppliers/AddSupplier`,action.payload).then(()=>{window.location.reload(false)})
     },
    // decremented: state => {
    //   state.value -= 1
    // }
  }
})

export const { reduxfetchSuppliers,reduxUpdateSupplier,reduxDeleteSupplier,reduxUploadSupplier } = datasuppliersSlice.actions;
export default datasuppliersSlice.reducer
