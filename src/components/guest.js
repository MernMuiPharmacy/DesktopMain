/* eslint-disable no-unused-vars */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PersonAdd } from '@mui/icons-material';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/devAtefturki">
        Atef Turki
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3];

const imgUrls = [
    require('../components/showcase/admin.gif'),
    require('../components/showcase/accountant.gif'),
    require('../components/showcase/manager.gif')
               ];
const descriptions=["sees insights on the server's running condition",
"sees all sales fully and thoughroughly, accounts for taxes & profit margins and can export all to a spreadsheet",
"oversees insights in charts, keeps track of sales and can manage staff roles, suppliers and stock products."];            
const titles=["Admin","Accountant","Manager"];            
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Guest({cb}) {
function handleLogout(){
  return cb("")
}
const unload=async ()=>{
  const val= await AsyncStorage.removeItem('tokenCookie');
  if (val!==null){window.location.reload(false);return cb("")}
 
}
//React.useEffect (()=>{onscreenload()},[])




  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PersonAdd sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Welcome
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              MERN_MUI_Pharmacy
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Introducing our pharmacy management platform, a comprehensive solution
             designed for the modern pharmacy. Streamline inventory, sale insights 
           and accounting seamlessly, enhancing operational efficiency and delivering 
             top-notch pharmaceutical services.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={()=>{alert("you're already a client")}} variant="contained">Become a client</Button>
              <Button onClick={unload} variant="outlined">Logout</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card,index) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={imgUrls[index]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {titles[index]}
                    </Typography>
                    <Typography>
                    {descriptions[index]}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button> */}
                {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Guest
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          if you're part of a team and seeing this, please consult your manager about your role
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}