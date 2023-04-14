import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllUsers } from '../../../../actions/userAction';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

const AllUsers = () => {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  }, [dispatch, error]);

  const columns = [
    { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },

    {
      field: 'email',
      headerName: 'Email',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: 'role',
      headerName: 'Role',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return (params.row.role, 'role') === 'admin'
          ? 'greenColor'
          : 'redColor';
      },
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/admin/user/${params.id}`}>
              <EditIcon
                sx={{
                  mt: 1,
                  // color: 'primary.main',
                  color: 'green',
                }}
              />
            </Link>

            <Button>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item?._id,
        role: item?.role,
        email: item?.email,
        name: item?.name,
      });
    });
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h7">ALL USERS</Typography>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      </Box>
    </>
  );
};

export default AllUsers;
