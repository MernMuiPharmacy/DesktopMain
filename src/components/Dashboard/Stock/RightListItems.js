import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ArrowBack, DateRange, EventAvailable, Inventory, LocalShipping, QuestionMark, Restore, Update, UpdateDisabled } from '@mui/icons-material';

export const RightmainListItems = (
  <React.Fragment>
    <ListItemButton>
        <ListItemIcon>
    <ArrowBack/>
        </ListItemIcon>
    </ListItemButton>
      <ListSubheader component="div" inset>
      Time*
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Update />
      </ListItemIcon>
      <ListItemText primary="Time Start" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <UpdateDisabled />
      </ListItemIcon>
      <ListItemText primary="Time End" />
    </ListItemButton>
    
  </React.Fragment>
);

export const RightsecondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Date*
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <DateRange />
      </ListItemIcon>
      <ListItemText primary="Start Date" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EventAvailable />
      </ListItemIcon>
      <ListItemText primary="End Date" />
    </ListItemButton>
   
  </React.Fragment>
);