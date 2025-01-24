import React, { useContext,useState } from 'react';
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
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';


const pages = ['Home', 'Users', 'Tags','Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const { user ,logout } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let navigate = useNavigate(); 

  // const routeChange = ()=>{
  //     let path = '/login'; 
  //     navigate(path);
  // }

  const handleNavigation = (page) => {
    let path;
    switch(page) {
      case 'Questions':
        path = '/'; 
        navigate(path);
        break;
      case 'Users':
        path = '/'; 
        navigate(path);
        break;
      case 'Contact':
        path = '/contact'; 
        navigate(path);
        break;
      
      default:
        path='/error';
        navigate(path);
    }
    console.log(page)
  }

  return (
    <AppBar position="static" style={{backgroundColor:"#2f2d2e",  marginBottom:20}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            SQLTEX GPT
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Button onClick={()=>handleNavigation(page)}>{page}</Button>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleCloseNavMenu();
                  handleNavigation(page);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Tooltip title={user ? "Logout" : "Login"}>
              <IconButton
                onClick={logout}
                sx={{
                  padding: '8px 16px',
                  backgroundColor: '#000', // Black background for the button
                  color: '#fff',
                  borderRadius: '50px', // Fully rounded for a bulb-like shape
                  boxShadow: user
                  ? '0 0 15px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.5)' // Red glow for Logout
                  : '0 0 15px rgba(0, 255, 0, 0.8), 0 0 30px rgba(0, 255, 0, 0.5)', // Green glow for Login
                  textTransform: 'none', // Prevents uppercase text
                  transition: 'all 0.3s ease', // Smooth transitions for dynamic changes
                  marginRight: '16px', // Adds spacing from the right edge
              }}
              >
            {user ? "Logout" : "Login"}
              </IconButton>
            </Tooltip>
          </Box>




        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
