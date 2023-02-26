import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MovieIcon from '@mui/icons-material/Movie';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

export default class header extends Component {
  state={auth:true,
  anchorEl:null,
  anchorElNav:null,
  anchorElUser:null,
  pages: [],
user:null}
  

componentDidMount(){
  const a= JSON.parse(sessionStorage.getItem("user"))
  this.setState({user:a})
  if(a?.id){
  
    
  if(a?.idRol.id==1){
    this.setState({pages:[{nombre:'Pelicula admin',enlace:'/pelicula/list'},{nombre:'Actores',enlace:'/actor/list'}
    ,{nombre:'Admin',enlace:'/settings'},{nombre:'Usuarios',enlace:'/user/list'}]})
  }
  
  }}
  handleOpenNavMenu=(e)=>{
    //alert(e.currentTarget)
    this.setState({anchorElNav:e.currentTarget})
  }
  handleCloseNavMenu=()=>{
    this.setState({anchorElNav:null})
  }

  
  
  handleOpenUserMenu=(e)=>{
    this.setState({anchorElUser:e.currentTarget})
  }
  handleCloseUserMenu=()=>{
    this.setState({anchorElUser:null})
  }

  handleMenu(){}
  handleClose(){}
  logout(){
    sessionStorage.removeItem('user');
    window.location.reload()
  }
  render() {
    const {auth,anchorEl,anchorElNav, pages,anchorElUser,settings}=this.state
    return (
      <Grid>
          <header>

        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FilmRater
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={this.handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={this.handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem>
                  <Link to={"/"} > 
                    <Typography textAlign="center">Peliculas</Typography>
                    </Link>
                  </MenuItem>
                  
                  {pages.map((page) => (

                    <Link to={page.enlace} > 
                        <MenuItem key={page.nombre} >
                          <Typography textAlign="center">{page.nombre}</Typography>
                        </MenuItem>
                    </Link>
                  
                  ))}
                </Menu>
              </Box>
              <MovieIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                FilmRater
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                <Link to={"/"} > 
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                  
                        Peliculas
                      
                    </Button>
                </Link>
                  
                {pages.map((page) => (
                  <Link to={page.enlace} > 
                    <Button
                      key={page.nombre}
                      onClick={this.handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.nombre}
                    </Button>
                  </Link>
                  
                ))}
              </Box>

              {JSON.parse(sessionStorage.getItem("user"))===null ?
               <Box sx={{  display: { xs: 'none', md: 'flex' } }}>


              <Link to={"/login"}> 
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                  
                        Login
                      
                    </Button>
                </Link>

                <Link to={"/signin"}> 
                    <Button sx={{ my: 2, color: 'white', display: 'block' }} >
                  
                        Singin
                      
                    </Button>
                </Link>



              </Box> : 
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography sx={{ my: 2, color: 'white', display: 'block' }}>
                    {JSON.parse(sessionStorage.getItem("user")).nombre+" "+JSON.parse(sessionStorage.getItem("user")).apellido }
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={this.handleCloseUserMenu}
                >
                 
                    <MenuItem  onClick={this.logout}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                 
                </Menu>
              </Box>}
             
            </Toolbar>
          </Container>
        </AppBar>

      </header>
      <br/>
      </Grid>
    
      
    )
  }
}


























