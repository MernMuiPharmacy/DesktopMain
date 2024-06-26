/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { LINK_TO_BACKEND } from '../../../var';
import {useDispatch} from 'react-redux';
import {reduxDeleteSupplier}from '../../../redux/DataSuppliers'
export default function DeleteDialog(props) {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
const  itemsUnderSupplier=[];
props.respectiveItems.map((e)=>{if(e.providers===props.toDelete.id){itemsUnderSupplier.push(e)}})
console.log("itemsundersupp",itemsUnderSupplier,props.respectiveItems,props)
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            deleting this supplier will delete their respective products listed below, do you wish to proceed?
          </DialogContentText>

          <List>
    {itemsUnderSupplier.map((e)=><ListItemButton onClick={()=>{}}>
      <ListItemIcon>
        <img
              src={e.productImage}
              style={{
                height: '30px',
                margin: '0 auto',
              }}
              alt="Avatar"
            />
      </ListItemIcon>
      <ListItemText primary={e.productName} />
    </ListItemButton>)
    }
         </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{dispatch(reduxDeleteSupplier({itemsUnderSupplier:itemsUnderSupplier,props:props.toDelete}))}} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}