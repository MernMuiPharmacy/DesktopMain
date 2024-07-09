/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

import { DateField } from '@mui/x-date-pickers/DateField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';


import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LINK_TO_BACKEND } from '../../../var';

import {useDispatch} from 'react-redux'
import {reduxUploadStock} from '../../../redux/DataStock'


export default function StockDialog(props) {
  function formatSingleDigit(dateString) {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('/');
  
    // Add leading zero to single-digit day and month
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = month.length === 1 ? '0' + month : month;
  
    // Return the formatted date
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
    const [stockCreds,setStockCreds]=React.useState({productName:"",activeIngredient:"",type:"",price:"",prescOnly:0,qty:1,expires:"",productImage:"",refrigerate:0,providers:null})
  const [open, setOpen] = React.useState(false);
  const [date,setdate]=React.useState("");
 const [productName,setProductName]=React.useState("");
 const [activeIngredient,setActiveIngredient]=React.useState("");
 const [type,setType]=React.useState("")
 const [provider,setProvider]=React.useState("");
 const [expires,setExpires]=React.useState("");
 const [price,setPrice]=React.useState("");
 const [qty,setQty]=React.useState("");
 const [imageLink,setImageLink]=React.useState("");
 const [refrigerate,setRefrigerate]=React.useState(0);
 const [prescOnly,setPrescOnly]=React.useState(0);
const [categorySelect,setCategorySelect]=React.useState("Existing");

const categoryToggle=(event)=>{
  setCategorySelect(event.target.value)
 }
  const handlenamechange=(event)=>{
    setProductName(event.target.value)
    setStockCreds({...stockCreds,productName:event.target.value})
    console.log("name",productName)
  }
  const handleactiveingredient=(event)=>{
    setActiveIngredient(event.target.value)
    setStockCreds({...stockCreds,activeIngredient:event.target.value})
    console.log("acting",activeIngredient)
  }
  const handletype=(event)=>{
    setType(event.target.value)
    setStockCreds({...stockCreds,type:event.target.value})
    console.log("type",type)
  }
  const handlenprovider=(event)=>{
    setProvider(event.target.value)
    setStockCreds({...stockCreds,providers:parseInt(event.target.value)})
    console.log("provider",provider)
  }
  const handleExpiry=(event)=>{
    setExpires(formatSingleDigit(event))
    setStockCreds({...stockCreds,expires:formatSingleDigit(event)})
    console.log("expiry",expires)
  }
  const handlePrice=(event)=>{
    setPrice(event.target.value)
    setStockCreds({...stockCreds,price:event.target.value})
    console.log("price",price)
  }
 const handleQuantity=(event)=>{
    setQty(event.target.value)
    setStockCreds({...stockCreds,qty:event.target.value})
    console.log("qty",qty)
 }
 const handleimage=(event)=>{
    setImageLink(event.target.value)
    setStockCreds({...stockCreds,productImage:event.target.value})
    console.log("image",imageLink)
 }
 const handlefridge=(event)=>{
    setRefrigerate(event.target.value)
    setStockCreds({...stockCreds,refrigerate:event.target.value})
    console.log("refrigerate",event.target.value)
 }
 const handleprescription=(event)=>{
    setPrescOnly(event.target.value)
    setStockCreds({...stockCreds,prescOnly:event.target.value})
    console.log("prescription",event.target.value)
 }
 
 const handleClickOpen = () => {
    props.cb(true);
  };

  const handleClose = () => {
    props.cb(false);
  };
  const [age, setAge] = React.useState('');
  const [age2, setAge2] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };
  function refreshPage() {
    window.location.reload(false);
  
  }
  const dispatch=useDispatch()
  const uploadStock=(data)=>{
   // dispatch(reduxUploadStock(data))
    axios.post(`${LINK_TO_BACKEND}stock/addStock`,data).then(()=>{window.location.reload(false)})
  }

  return (
    <React.Fragment>
     <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out your new product's specifications, you will find the provider's id under "Suppliers"  
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            fullWidth
            variant="standard"
            required
            value={productName}
            onChange={handlenamechange}
        />
           <TextField
            autoFocus={false}
            margin="dense"
            id="activeIngredient"
            label="   Active Ingredient"
            fullWidth
            variant="standard"
            required
            value={activeIngredient}
            onChange={handleactiveingredient}
          />
<FormControl style={{marginTop:10 }} fullWidth> 
<InputLabel  margin='dense' style={{marginLeft:-8}} id="demo-simple-select-label9">Provider *</InputLabel>
<Select
 labelId="demo-simple-select-label9"
 id="demo-simple-select9"
 value={provider}

 label="Provider"
 onChange={handlenprovider}
 variant="standard"
 fullWidth
 required
 InputLabelProps={{
   shrink: true,
 }}
>
 {/* <MenuItem value={1}>yes</MenuItem>*/}
 {/* <MenuItem value={provider}>{props.supp.map((e)=>{if (e["idprovider"]===provider) {return e.companyname}})}</MenuItem> */}
 {props.supp.map((e)=><MenuItem value={e["idprovider"]}>{e["companyname"]}</MenuItem>)}
 {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>
</FormControl>


<FormControl style={{marginTop:13 }} fullWidth>
      {/* <FormLabel id="demo-row-radio-buttons-group-label" color='primary'>Category *</FormLabel> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
       // defaultValue="Existing"
       value={categorySelect}
       onChange={categoryToggle}
      >
        <FormControlLabel value="New Category" control={<Radio />} label="New Category" />
        <FormControlLabel value="Existing" control={<Radio />} label="Existing" />
      </RadioGroup>
    </FormControl>

 {categorySelect==="Existing"?
 
 <FormControl style={{marginTop:10 }} fullWidth> 
<InputLabel  margin='dense' style={{marginLeft:-8}} id="demo-simple-select-label9">Category *</InputLabel>
<Select
 labelId="demo-simple-select-label9"
 id="demo-simple-select9"
 value={type}

 label="Existing Category"
 onChange={handletype}
 variant="standard"
 fullWidth
 required
 InputLabelProps={{
   shrink: true,
 }}
>
 {/* <MenuItem value={1}>yes</MenuItem>*/}
 {/* <MenuItem value={provider}>{props.supp.map((e)=>{if (e["idprovider"]===provider) {return e.companyname}})}</MenuItem> */}
 {props.categories.map((e)=><MenuItem value={e}>{e}</MenuItem>)}
 {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>
</FormControl>
 : <TextField
            autoFocus={false}
            margin="dense"
            id="type"
            label="New Category"
            
            fullWidth
            variant="standard"
            required
            value={type}
            onChange={handletype}
          /> } 


          

       <TextField
   autoFocus={false}
   margin="dense"
   id="price"
   label="Price"
   fullWidth
   variant="standard"
   required
   value={price}
   onChange={handlePrice}
 />
  <TextField
   autoFocus={false}
   margin="dense"
   id="qty"
   label="Quantity"
   fullWidth
   variant="standard"
   required
   value={qty}
   onChange={handleQuantity}
 />
 <TextField
            autoFocus={false}
            margin="dense"
            id="productImage"
            label="Image Link"
            fullWidth
            variant="standard"
            required
            value={imageLink}
            onChange={handleimage}
          /> 
 <FormControl style={{marginTop:10}} fullWidth>
<InputLabel  margin='dense' style={{marginLeft:-8}} id="demo-simple-select-label">Refrigerate *</InputLabel>
<Select
 labelId="demo-simple-select-label"
 id="demo-simple-select"
 value={refrigerate}

 label="Refrigirate"
 onChange={handlefridge}
 variant="standard"
 fullWidth
 required
 InputLabelProps={{
   shrink: true,
 }}
>
 <MenuItem value={1}>yes</MenuItem>
 <MenuItem value={0}>no</MenuItem>
 {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>
</FormControl>
<FormControl style={{marginTop:10 }} fullWidth>
<InputLabel  margin='dense' style={{marginLeft:-8}} id="demo-simple-select-label2">Prescription Only *</InputLabel>
<Select
 labelId="demo-simple-select-label2"
 id="demo-simple-select2"
 value={prescOnly}

 label="Prescription Only"
 onChange={handleprescription}
 variant="standard"
 fullWidth
 required
 InputLabelProps={{
   shrink: true,
 }}
>
 <MenuItem value={1}>yes</MenuItem>
 <MenuItem value={0}>no</MenuItem>
 {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>
</FormControl>      
<FormControl style={{marginTop:10 }} fullWidth>
{/* <InputLabel  margin='dense' style={{marginLeft:-8}} id="demo-simple-select-label3">Expiry Date *</InputLabel> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                 {/* <DateCalendar
          label="Expiry Date"
          value={!expires.length?dayjs():null}
         onChange={(newValue) =>{ setExpires(`${newValue["$D"].toString()+"/"+(newValue["$M"]+1).toString()+"/"+newValue["$y"].toString().slice(2,4)}`),handleExpiry(`${newValue["$D"].toString()+"/"+(newValue["$M"]+1).toString()+"/"+newValue["$y"].toString().slice(2,4)}`)}}
        // onChange={(newValue)=>{console.log(newValue)}}
        /> */}
         <DesktopDatePicker
         variant="inline"
          label="Expiry Date *"
          value={null}
          onChange={(newValue) =>{ setExpires(`${newValue["$D"].toString()+"/"+(newValue["$M"]+1).toString()+"/"+newValue["$y"].toString().slice(2,4)}`),handleExpiry(`${newValue["$D"].toString()+"/"+(newValue["$M"]+1).toString()+"/"+newValue["$y"].toString().slice(2,4)}`)}}
          format="DD-MM-YY"
          slotProps={{
            textField: {
              variant: 'standard',
              
            },}}
        />
                </LocalizationProvider>
          </FormControl>

        </DialogContent>
     
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {stockCreds.productName.length&&
          stockCreds.activeIngredient.length&&
          stockCreds.type.length&&
          stockCreds.price.length&&
          stockCreds.qty.length&&
          stockCreds.expires.length&&
          stockCreds.productImage.length?
          <Button onClick={()=>{console.log(stockCreds),uploadStock(stockCreds),handleClose()}} >UPLOAD</Button>:
          <Button disabled>UPLOAD</Button>}
          
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}