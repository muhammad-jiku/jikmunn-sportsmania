import React, { useEffect, useState } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
//  internal imports
import { Loader } from '../../../Shared';
import { DELETE_ORDER_RESET } from '../../../../constants/orderConstant';
import {
  clearErrors,
  deleteOrder,
  getAllOrders,
} from '../../../../actions/orderAction';

const AllOrders = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const [pageSize, setPageSize] = useState(5);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (deleteError) {
      // console.log(deleteError);
      alert.error('Failed to delete the order!');
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Order Deleted Successfully');
      navigate('/dashboard/admin/orders');
      dispatch({
        type: DELETE_ORDER_RESET,
      });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

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
                // height: '100%',
                height: 500,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="span"
                color="primary.main"
                textAlign={'center'}
                sx={{ mx: 2, my: 1, fontSize: '26px', fontWeight: 800 }}
              >
                List of All Orders
              </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={10}
                disableSelectionOnClick
                // autoHeight
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography variant="span" textAlign="center" color="red">
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
