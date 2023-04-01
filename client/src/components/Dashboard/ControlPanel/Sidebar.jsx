import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/avatar_1.png';
import { clearErrors, loadUser } from '../../../actions/userAction';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user);
  console.log(user);
  const [avatar, setAvatar] = useState(
    user ? `${user?.avatar?.url}` : `${profile}`
  );
  const [avatarPreview, setAvatarPreview] = useState(
    user ? `${user?.avatar?.url}` : `${profile}`
  );

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm();

  const handleAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
        // do something with the result
        // console.log(reader.result);
      };
    } else {
      console.error('The selected file is not a valid Blob object.');
    }
  };

  const onSubmitHandler = (values) => {
    // console.log(values);
    const userInfo = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar,
    };
    // console.log(userInfo);
    dispatch(loadUser(userInfo));
  };

  //  First Capital Letter of the Name
  const name = user?.name;
  const firstLetter = name.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = name.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

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
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                aria-label="upload picture"
                component="label"
                htmlFor="profile"
                sx={{
                  color: 'white',
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'white',
                  },
                }}
                size="small"
              >
                <input
                  hidden
                  onChange={handleAvatar}
                  accept="image/*"
                  type="file"
                  id="profile"
                  name="profile"
                />
                <CameraAltIcon />
              </IconButton>
            }
          >
            <Avatar
              alt="Change Avatar"
              title="Change Avatar"
              src={avatarPreview}
              sx={{
                width: 150,
                height: 150,
                border: '1px solid',
                borderColor: 'secondary',
                cursor: 'pointer',
              }}
            />
          </Badge>
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
