import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Button,
} from '@mui/material';
import styles from '../../styles/Navbar.module.css';
import person1 from '../../assets/images/avatar_1.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logoutUser } from '../../actions/userAction';

const Navbar = ({ isAuthenticated, user }) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

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

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    alert.success('Logout Successfully');
    localStorage?.removeItem('token');
    localStorage?.removeItem('cartItems');
    localStorage?.removeItem('shippingInfo');
    navigate('/');
  };

  const pages = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Products',
      path: '/products',
    },
    // {
    //   title: 'Contact',
    //   path: '/contact',
    // },
    // {
    //   title: 'About',
    //   path: '/about',
    // },
  ];

  return (
    <AppBar position="static" className={styles.header} color="secondary">
      <Toolbar className={styles.toolbar}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {/*  Logo Title */}
          <Box
            sx={{
              p: 2,
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant="h5"
              className={styles.headerText}
              sx={{
                // mr: 2,
                display: {
                  // xs: 'flex',
                  // md: 'none',
                  xs: 'none',
                  md: 'block',
                },
                // flexGrow: 1,
                // fontWeight: 300,
                fontSize: {
                  md: '32px',
                },
                // letterSpacing: '0.125rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              Sports Mania
            </Typography>
          </Box>
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
        </Box>

        {/*  Pages */}
        <Typography
          variant="h5"
          // noWrap
          // component="a"
          className={styles.headerText}
          sx={{
            // mr: 2,
            display: {
              xs: 'flex',
              md: 'none',
            },
            justifyContent: 'center',
            flexGrow: 1,
            // fontWeight: 300,
            fontSize: {
              xs: '20px',
              sm: '24px',
            },
            // letterSpacing: '0.125rem',
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
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
          {user?.role === 'user' && (
            <Tooltip title="Cart">
              <IconButton
                disableRipple={true}
                style={{ color: 'white' }}
                onClick={() => navigate('/carts')}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
              }}
            >
              <Avatar
                alt={user ? user?.name : 'Random User'}
                src={isAuthenticated && user ? user?.avatar?.url : person1}
              />
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
            <Box>
              {isAuthenticated && user ? (
                <Box>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={'/dashboard'}
                        style={{
                          textDecoration: 'none',
                          color: '#000',
                        }}
                      >
                        Profile
                      </Link>
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button variant="contained" onClick={handleLogoutUser}>
                      Logout
                    </Button>
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={'/login'}
                      style={{
                        textDecoration: 'none',
                        color: '#000',
                      }}
                    >
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
