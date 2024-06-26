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
import axios from 'axios';
import { LINK_TO_BACKEND } from '../../../var';
export default function SupplierDialog(props) {
  const [open, setOpen] = React.useState(false);
 const [providerCreds,setProviderCreds]=React.useState({companyname:"",email:"",phoneNumber:"",providerImage:""})
 function refreshPage() {
  window.location.reload(false);

}
const uploadSupplier=(data)=>{
  axios.post(`${LINK_TO_BACKEND}suppliers/AddSupplier`,data).then(()=>{window.location.reload(false)})
}
 const handleClickOpen = () => {
    props.cb(true);
  };
const handlename=(event)=>{
  setProviderCreds({...providerCreds,companyname:event.target.value})
}
const handlemail=(event)=>{
  setProviderCreds({...providerCreds,email:event.target.value})
}
const handlephone=(event)=>{
  setProviderCreds({...providerCreds,phoneNumber:event.target.value})
}
const handleimage=(event)=>{
  setProviderCreds({...providerCreds,providerImage:event.target.value})
}
  const handleClose = () => {
    props.cb(false);
  };
 
  return (
    <React.Fragment>
     <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add Supplier</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out your new supplier's credentials, you will then be given an id which you can use for adding products under "Stock"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Company name"
            fullWidth
            variant="standard"
            required
            value={providerCreds.companyname}
            onChange={handlename}
          />
          <TextField
            autoFocus={false}
            margin="dense"
            id="phoneNumber"
            label="Phone number"
            fullWidth
            variant="standard"
            required
            value={providerCreds.phoneNumber}
            onChange={handlephone}
          />
           <TextField
            autoFocus={false}
            margin="dense"
            id="providerImage"
            label="Image link"
            fullWidth
            variant="standard"
            value={providerCreds.providerImage}
            onChange={handleimage}
          />
          <TextField
            autoFocus={false}
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            required
            value={providerCreds.email}
            onChange={handlemail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        {providerCreds.companyname.length&&
        providerCreds.email.length&&
        providerCreds.phoneNumber.length?
        <Button onClick={()=>{console.log(providerCreds),uploadSupplier(providerCreds),handleClose()}}>UPLOAD</Button>
        :<Button disabled>UPLOAD</Button>} 
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}