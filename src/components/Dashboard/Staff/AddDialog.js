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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LINK_TO_BACKEND } from '../../../var';
import {useDispatch} from 'react-redux'
import {reduxUploadStaff} from '../../../redux/DataStaff'
export default function StaffDialog(props) {
const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
 const [staffCreds,setStaffCreds]=React.useState({name:"",useremail:"",role:"",userpass:""})
 function refreshPage() {
  window.location.reload(false);

}
const uploadStaff= async (data)=>{
 axios.post('http://localhost:4000/staff/insertThroughManager',data).then(()=>{window.location.reload(false)})
 await axios({
    method:'post',
    headers: {Authorization:"bearer "+await AsyncStorage.getItem('tokenCookie')},
    url:`${LINK_TO_BACKEND}staff/insertThroughManager`,
    data:data
}).then((response)=>{
    console.log(response)
    window.location.reload(false)
});
//dispatch(reduxUploadStaff(data))
}
 const handleClickOpen = () => {
    props.cb(true);
  };
const handlename=(event)=>{
  setStaffCreds({...staffCreds,name:event.target.value})
}
const handlemail=(event)=>{
  setStaffCreds({...staffCreds,useremail:event.target.value})
}
const handlerole=(event)=>{
  setStaffCreds({...staffCreds,role:event.target.value})
}
const handlepass=(event)=>{
  setStaffCreds({...staffCreds,userpass:event.target.value})
}
  const handleClose = () => {
    props.cb(false);
  };
 
  return (
    <React.Fragment>
     <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Add Staff Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out your new employee's credentials assigning them a role
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            fullWidth
            variant="standard"
            required
            value={staffCreds.name}
            onChange={handlename}
          />
          <TextField
            autoFocus={false}
            margin="dense"
            id="role"
            label="Role"
            fullWidth
            variant="standard"
            required
            value={staffCreds.role}
            onChange={handlerole}
          />
          <TextField
            autoFocus={false}
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            variant="standard"
            required
            value={staffCreds.useremail}
            onChange={handlemail}
          />
          <TextField
            autoFocus={false}
            margin="dense"
            id="pass"
            label="password"
            
            variant="standard"
            fullWidth
            required
            value={staffCreds.userpass}
            onChange={handlepass}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        {staffCreds.userpass.length&&
        staffCreds.name.length&&
        staffCreds.useremail.length&&
        staffCreds.role.length?
        <Button onClick={()=>{console.log(staffCreds),uploadStaff(staffCreds),handleClose()}}>UPLOAD</Button>
        :<Button disabled>UPLOAD</Button>} 
        </DialogActions>
      </Dialog>
      
    </React.Fragment>
  );
}