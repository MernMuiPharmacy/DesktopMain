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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { LINK_TO_BACKEND } from '../../../var';
export default function PromptDialog(props) {
    const navigation=useNavigation();
  const [open, setOpen] = React.useState(false);
 const [user,changeuser]=React.useState(props.staffdata.filter((e)=>e.role==="accountant")[0]["email"]);
 const [userpass,changeuserpass]=React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setPromptOpen(false);
  };
  const handleuser=(event)=>{
    changeuser(event.target.value)
  }
  const handlepass=(event)=>{
    changeuserpass(event.target.value)
  }
  //forget not to add a return button
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // setCredentials({
    //   useremail: data.get('email'),
    //   userpass: data.get('password'),
    // });
    var tobe={
      useremail: user,//data.get('email'),
      userpass: userpass//data.get('password'),
    }
    axios
                  .post(`${LINK_TO_BACKEND}staff/login`,tobe)
                  .then((resp)=>{console.log("tobe",tobe),props.setAccountantCredentials(resp.data),props.setAccountantValidated(true)}) //cb(resp.data)
                  .catch(error=>{
                    if(error){
                      alert(
                          'incorrect credentials',
                          'please check your email or password'
                      )}
                  })
  };
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        //   onSubmit: (event) => {
        //     event.preventDefault();
        //     const formData = new FormData(event.currentTarget);
        //     const formJson = Object.fromEntries(formData.entries());
        //     const email = formJson.email;
        //     const password=formJson.pass;
        //     console.log(email,password);
        //     handleClose();
        //   },
        }}
      >
        <DialogTitle>Consult Accountant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To go through with the deletion, you shall consult your hired accountant to input their credentials.
            once validated, an excel file with all the "To Be Deleted" products sales will be downloaded before being wiped permanentally.
          </DialogContentText>
          <Select
 labelId="demo-simple-select-label9"
 id="demo-simple-select9"
 value={user}

 label="Provider"
 onChange={handleuser}
 variant="standard"
 fullWidth
 required
 InputLabelProps={{
   shrink: true,
 }}
>

  <MenuItem value={user}>{props.staffdata.map((e)=>{if (e["email"]===user) {return e.name}})}</MenuItem>
 {props.staffdata.map((e)=>{if(e.role==="accountant"&&e.email!==user){return(<MenuItem  value={e["email"]}>{e["name"]}</MenuItem>)}})}
 {/* <MenuItem value={30}>Thirty</MenuItem> */}
</Select>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password123123"
            label="password"
            type="password"
            fullWidth
            value={userpass}
            onChange={handlepass}
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{navigation.navigate("Deleted")}}>Cancel</Button>
          <Button type="submit">Validate</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}