/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import accountant from './assets/accountant.jpg';
import manager from './assets/manager.jpg';
import guest from './assets/guest.jpg';
import admin from './assets/admin.jpg';
export default function GridCard(props) {
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.role==="manager"?manager:(props.role==="admin"?admin:(props.role==="accountant"?accountant:guest))}
          alt={props.role}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.role}
          </Typography>
       
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>{props.cb(props.hl)}}>
          Highlight
        </Button>
        <Button size="small" color="primary" onClick={()=>{props.openmodal(props.state),props.cb(props.hl)}}>
            Change role
          </Button>
      </CardActions>
    </Card>
  );
}
