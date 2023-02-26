

/*import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Grid } from '@mui/material';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';





function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = 240;
  const [anchorEl, setAnchorEl] = React.useState(null);
  //let history = useHistory();
  const  [navItems, setnavItems] =  React.useState([{nombre:"login",icon:<LoginIcon/>,enlace:"/Login"},{nombre:"SingUp",icon:<PersonAddIcon/>,enlace:"/singin"}]);


useEffect(() => {
  //alert("dsfsdf")

const a= JSON.parse(sessionStorage.getItem("user"))
  if(a?.id){
  
    
  if(a?.idRol.id==1){
    setnavItems([{nombre:'Pelicula',icon:<MovieIcon/>,enlace:'/pelicula/list'},{nombre:'Actores', icon:<PeopleAltIcon/>,enlace:'/actor/list'}
    ,{nombre:'Admin', icon:<SettingsIcon/>,enlace:'/settings'},{nombre:'Usuarios', icon:<PersonIcon/>,enlace:'/user/list'}])
  }
  


  }
}, []);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    sessionStorage.removeItem('user');
    window.location.reload()
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MOVIE RATE
      </Typography>
      <Divider />
      <List>
        <ListItem key={"Home"} disablePadding>

        <Link  to={`/`} > 
        <ListItemButton sx={{ textAlign: 'center' }}>
              <HomeIcon/>
                <ListItemText primary={"Home"} />
              </ListItemButton>
            </Link>
              
        </ListItem>
        {navItems.map((item) => (


          <Link key={item.nombre} to={item.enlace} > 
            <ListItem  disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                {item.icon}
                <ListItemText primary={item.nombre} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MOVIE RATE
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            <Link  to={`/`} > 
                    <Button key="Home" sx={{ color: '#fff' }}>
                    <HomeIcon/>  Home
                    </Button>
            </Link>
            {navItems.map((item) => (
               <Link key={item.nombre} to={item.enlace} > 
                <Button  sx={{ color: '#fff' }}>
                {item.icon}  {item.nombre}
                </Button>
              </Link>
              
            ))}
             {JSON.parse(sessionStorage.getItem("user"))?.id==null ? <div></div> : (
           
              <Link>
                <Button  onClick={handleMenu}  sx={{ color: '#fff' }}>
                  {JSON.parse(sessionStorage.getItem("user")).nombre}  {JSON.parse(sessionStorage.getItem("user")).apellido}
                </Button>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={()=>logOut()} >LogOut</MenuItem>
                
                </Menu>
              </Link>
            )}
        
            
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
     
      </Box>
    </Box>
    </header>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   
  window: PropTypes.func,
};

export default DrawerAppBar;