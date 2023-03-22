import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Button,
} from '@mui/material';
import './Navbar.scss';
import logo from '../../../assets/images/logo.png';
import person1 from '../../../assets/images/avatar_1.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const pages = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'About',
    path: '/about',
  },
];

const settings = [
  {
    title: 'Profile',
    path: '/dashboard/profile',
  },
  {
    title: 'Login',
    path: '/login',
  },
  {
    title: 'Logout',
  },
];

const Logo = styled('img')(({ theme }) => ({
  width: '15rem',
  minWidth: '10rem',
}));

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

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

  return (
    <AppBar position="static" className="header" color="secondary">
      <Toolbar className="toolbar">
        {/*  Logo */}
        <Link to={`/`}>
          <Logo
            src={logo}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          />
        </Link>

        {/* Menus */}
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'flex',
              md: 'none',
            },
          }}
        >
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
            {pages.map(({ title, path }) => (
              <MenuItem key={title} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={path}
                    style={{
                      textDecoration: 'none',
                      color: '#000',
                    }}
                  >
                    {title}
                  </Link>
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/*  Pages */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            // mr: 2,
            display: {
              xs: 'flex',
              md: 'none',
            },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 300,
            fontSize: {
              xs: 18,
              sm: 22,
              md: 'auto',
            },
            // letterSpacing: '0.125rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Sports Mania
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          {pages.map(({ title, path }) => (
            <Button
              key={title}
              href={path}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              {title}
            </Button>
          ))}
        </Box>

        {/* Profile menu */}
        <Box
          sx={{
            flexGrow: 0,
            ml: 2,
            display: {
              xs: 'flex',
            },
          }}
        >
          <Tooltip title="Cart">
            <IconButton disableRipple={true} style={{ color: 'white' }}>
              <ShoppingCartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton disableRipple={true} style={{ color: 'white' }}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
              }}
            >
              <Avatar alt="Remy Sharp" src={person1} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: '45px',
            }}
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
            onClose={handleCloseUserMenu}
          >
            {settings.map(({ title, path }) => (
              <MenuItem key={title} onClick={handleCloseUserMenu}>
                {path ? (
                  <>
                    <Typography textAlign="center">
                      <Link
                        to={path}
                        style={{
                          textDecoration: 'none',
                          color: '#000',
                        }}
                      >
                        {title}
                      </Link>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Button
                      sx={{
                        color: 'white',
                        backgroundColor: 'secondary.main',
                        fontWeight: 400,
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'secondary.main',
                        },
                      }}
                    >
                      {title}
                    </Button>
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
