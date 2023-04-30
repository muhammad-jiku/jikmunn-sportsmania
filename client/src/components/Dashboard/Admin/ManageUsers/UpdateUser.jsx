import React, { useEffect, useState } from 'react';
import {
  clearErrors,
  getUserDetails,
  updateUser,
} from '../../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_USER_RESET } from '../../../../constants/userConstant';
import { Loader } from '../../../Shared';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

const UpdateUser = () => {
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState(user ? user?.name : '');
  const [email, setEmail] = useState(user ? user?.email : '');
  const [userRole, setUserRole] = useState(user ? user?.role : '');

  const roles = ['admin', 'user'];

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('role', userRole);

    dispatch(updateUser(id, myForm));
  };

  useEffect(() => {
    if (user && user?._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setUserRole(user?.role);
    }
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (updateError) {
      // console.log(updateError);
      alert.error('Failed to update user role!');
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('User Role Updated Successfully');
      navigate('/dashboard/admin/users');
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, user, error, updateError, isUpdated, navigate, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="p"
            color="primary"
            textAlign="center"
            sx={{ fontSize: '24px', fontWeight: 800 }}
          >
            Update User Role
          </Typography>

          <Box
            sx={{
              p: 2,
              ml: {
                xs: 0,
                md: 6,
              },
            }}
            component="form"
            noValidate
            autoComplete="off"
            // encType="multipart/form-data"
            onSubmit={updateUserSubmitHandler}
          >
            {/*  username */}
            <TextField
              sx={{ mt: 0.5 }}
              label={'Name'}
              fullWidth
              required
              type="text"
              placeholder="Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/*  email */}
            <TextField
              sx={{ mt: 2, pt: 1 }}
              label="Email"
              fullWidth
              required
              type="email"
              placeholder="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* user role */}
            <TextField
              sx={{ mt: 2, pt: 1 }}
              select
              fullWidth
              label="User Role"
              placeholder="User Role"
              required
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedUserIcon />
                  </InputAdornment>
                ),
              }}
            >
              {roles.map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  label={'User Role'}
                  placeholder={'User Role'}
                >
                  {role}
                </MenuItem>
              ))}

              {/* <div>
              <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div> */}
            </TextField>

            <Button
              sx={{ p: 1, mt: 2 }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={
                updateLoading ? true : false || userRole === '' ? true : false
              }
            >
              Update
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateUser;
