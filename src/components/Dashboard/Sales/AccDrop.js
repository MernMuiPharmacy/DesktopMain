import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
//import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
//import Cloud from '@mui/icons-material/Cloud';
import { Email, Logout,AssignmentInd,Person } from '@mui/icons-material';

export default function AccDrop(props) {
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>User: </ListItemText>
          <Typography variant="body2" color="text.secondary">
            {props.creds.name}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Email fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email: </ListItemText>
          <Typography variant="body2" color="text.secondary">
            {props.creds.email}
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AssignmentInd fontSize="small" />
          </ListItemIcon>
          <ListItemText>Role: </ListItemText>
          <Typography variant="body2" color="text.secondary">
           {props.creds.role}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={props.logout}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText >Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}