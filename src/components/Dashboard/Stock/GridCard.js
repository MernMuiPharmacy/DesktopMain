import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Image } from 'react-native';
import { Button, CardActionArea, CardActions } from '@mui/material';
import accountant from './assets/accountant.jpg';
import manager from './assets/manager.jpg';
import guest from './assets/guest.jpg';
import admin from './assets/admin.jpg';
export default function GridCard(props) {
    
  return (
    <Card sx={{ maxWidth: 250,minWidth:250 }}>
      <CardActionArea>
   
        {/* <CardMedia
          component="img"
          height="140"
          image={props.providerImage}
          alt={props.companyname}
          
        /> */}
        <Image
        
        style={{height:140,width:250,resizeMode:"center",alignSelf:"center",marginLeft:0,marginRight:0}}
            source={props.productImage}
            // alt={Object.keys(Highlight).length?Highlight.companyname:""}
            
          />
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.productName}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary"component="div">
            {props.type}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary"component="div">
            {props.activeIngredient}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {props.role}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={()=>{props.cb(props.hl)}}>
          Highlight
        </Button>
      </CardActions>
    </Card>
  );
}