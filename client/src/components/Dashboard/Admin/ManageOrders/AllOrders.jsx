import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from '../../../../actions/orderAction';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DELETE_ORDER_RESET } from '../../../../constants/orderConstant';
import { Loader } from '../../../Shared';

const AllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate('/dashboard/admin/orders');
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return (params.id, 'status') === 'Delivered' ? 'green' : 'red';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Quantity',
      type: 'number',
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/dashboard/admin/order/${params.id}`}>
              <EditIcon
                sx={{
                  mt: 0.5,
                  // color: 'primary.main',
                  color: 'green',
                }}
              />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item?._id,
        itemsQty: item?.orderItems.length,
        amount: item?.totalPrice,
        status: item?.orderStatus,
      });
    });

  return (
    <>
      {' '}
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
            boxSizing: 'border-box',
            width: {
              xs: 'auto',
              md: '70%',
            },
          }}
        >
          {orders ? (
            <Box
              sx={{
                p: 2,
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="p"
                color="primary.main"
                textAlign="center"
                sx={{ fontSize: '22px', fontWeight: 900 }}
              >
                List of All Orders
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
              />
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" textAlign="center" color="red">
                Nothing is order yet!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default AllOrders;
