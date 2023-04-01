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
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  console.log(user);

  //  First Capital Letter of the Name
  const name = user?.name;
  const firstLetter = name?.charAt(0);
  const firstLetterCap = firstLetter?.toUpperCase();
  const remainingLetters = name?.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Card
      variant="outlined"
      sx={{
        paddingY: 2,
        border: '1px solid',
        borderColor: 'primary.main',
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
            display: 'flex',
            p: 2,
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
            mb: 1.5,
          }}
          variant="h6"
          color="text.secondary"
        >
          {capitalizedName}
          {/* {user?.name} */}
        </Typography>
        <List>
          <ListItem
            disablePadding
            sx={{ color: 'primary.main', cursor: 'pointer', p: 1.5 }}
            onClick={() => navigate('/dashboard')}
          >
            <InsertEmoticonIcon />
            <Typography variant="span" sx={{ ml: 1 }}>
              {' '}
              My Account
            </Typography>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ color: 'primary.main', cursor: 'pointer', p: 1.5 }}
            onClick={() => navigate('/dashboard/myorders')}
          >
            <ShoppingCartIcon />
            <Typography variant="span" sx={{ ml: 1 }}>
              {' '}
              My Orders
            </Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
