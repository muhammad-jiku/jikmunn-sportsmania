import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/avatar_1.png';
import { clearErrors } from '../../../actions/userAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {/* Desktop */}
      <Card
        variant="outlined"
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },
          borderRight: '3px solid',
          borderRadius: 0,
          borderColor: 'primary.main',
          width: 280,
          m: 0,
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
            }}
          >
            <Avatar
              alt="Change Avatar"
              title="Change Avatar"
              src={user ? `${user?.avatar?.url}` : `${profile}`}
              sx={{
                width: 135,
                height: 135,
                border: '1px solid',
                borderColor: 'secondary',
                cursor: 'pointer',
              }}
            />
          </Box>

          <Typography
            sx={{
              textTransform: 'capitalize',
            }}
            variant="h6"
            color="text.secondary"
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              mb: 1.5,
            }}
            variant="h7"
            color="text.secondary"
          >
            Joined On: {String(user?.createdAt).substr(0, 10)}
          </Typography>

          <List>
            <ListItem
              disablePadding
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                pt: 1.5,
              }}
              onClick={() => navigate('/dashboard')}
            >
              <PersonIcon />
              <Typography variant="span" sx={{ ml: 1 }}>
                {' '}
                My Profile
              </Typography>
            </ListItem>

            {user?.role === 'admin' && (
              <>
                <ListItem
                  disablePadding
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    pt: 1.5,
                  }}
                  onClick={() => navigate('/dashboard/admin')}
                >
                  <DashboardIcon />
                  <Typography variant="span" sx={{ ml: 1 }}>
                    {' '}
                    Dashboard
                  </Typography>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    pt: 1.5,
                  }}
                  onClick={() => navigate('/dashboard/admin/product/new')}
                >
                  <AddCircleIcon />
                  <Typography variant="span" sx={{ ml: 1 }}>
                    {' '}
                    Add Product
                  </Typography>
                </ListItem>
              </>
            )}

            {user?.role === 'user' && (
              <ListItem
                disablePadding
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  pt: 1.5,
                }}
                onClick={() => navigate('/dashboard/myorders')}
              >
                <ShoppingCartIcon />
                <Typography variant="span" sx={{ ml: 1 }}>
                  {' '}
                  My Orders
                </Typography>
              </ListItem>
            )}

            <ListItem
              disablePadding
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                pt: 1.5,
              }}
              onClick={() => navigate('/dashboard/password/secure')}
            >
              <SecurityIcon />
              <Typography variant="span" sx={{ ml: 1 }}>
                {' '}
                Profile Shield
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>

      {/* Mobile */}
      <Box
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },
        }}
      >
        <List>
          <Swiper watchSlidesProgress={true} slidesPerView={3}>
            <SwiperSlide>
              {' '}
              <ListItem
                disablePadding
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  px: 0.5,
                  py: 1.5,
                  borderRight: '2px solid #682404',
                }}
                onClick={() => navigate('/dashboard')}
              >
                <PersonIcon />
                <Typography
                  variant="span"
                  sx={{ ml: 1, fontSize: '12px', fontWeight: 900 }}
                >
                  {' '}
                  My Profile
                </Typography>
              </ListItem>
            </SwiperSlide>

            {user?.role === 'admin' && (
              <>
                <SwiperSlide>
                  {' '}
                  <ListItem
                    disablePadding
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      px: 0.5,
                      py: 1.5,
                      borderRight: '2px solid #682404',
                    }}
                    onClick={() => navigate('/dashboard/admin')}
                  >
                    <DashboardIcon />
                    <Typography
                      variant="span"
                      sx={{ ml: 1, fontSize: '12px', fontWeight: 900 }}
                    >
                      {' '}
                      Dashboard
                    </Typography>
                  </ListItem>
                </SwiperSlide>

                <SwiperSlide>
                  {' '}
                  <ListItem
                    disablePadding
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      px: 0.5,
                      py: 1.5,
                      borderRight: '2px solid #682404',
                    }}
                    onClick={() => navigate('/dashboard/admin/product/new')}
                  >
                    <AddCircleIcon />
                    <Typography
                      variant="span"
                      sx={{ ml: 1, fontSize: '12px', fontWeight: 900 }}
                    >
                      {' '}
                      Add Product
                    </Typography>
                  </ListItem>
                </SwiperSlide>
              </>
            )}

            {user?.role === 'user' && (
              <SwiperSlide>
                {' '}
                <ListItem
                  disablePadding
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    px: 0.5,
                    py: 1.5,
                    borderRight: '2px solid #682404',
                  }}
                  onClick={() => navigate('/dashboard/myorders')}
                >
                  <ShoppingCartIcon />
                  <Typography
                    variant="span"
                    sx={{ ml: 1, fontSize: '12px', fontWeight: 900 }}
                  >
                    {' '}
                    My Orders
                  </Typography>
                </ListItem>
              </SwiperSlide>
            )}

            <SwiperSlide>
              {' '}
              <ListItem
                disablePadding
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  px: 0.5,
                  py: 1.5,
                  borderRight: '2px solid #682404',
                  // width: '150px',
                  // mr: 2,
                }}
                onClick={() => navigate('/dashboard/password/secure')}
              >
                <SecurityIcon />
                <Typography
                  variant="span"
                  sx={{ ml: 1, fontSize: '12px', fontWeight: 900 }}
                >
                  {' '}
                  Profile Shield
                </Typography>
              </ListItem>
            </SwiperSlide>
          </Swiper>
        </List>
      </Box>
    </>
  );
};

export default Sidebar;
