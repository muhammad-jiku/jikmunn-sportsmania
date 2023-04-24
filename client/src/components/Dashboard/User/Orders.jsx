import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../../actions/orderAction';
import { Loader } from '../../Shared';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        console.log(params.id);
        return (params.id, 'status') === 'Delivered' ? 'green' : 'red';
      },
    },
    {
      field: 'itemsQuantity',
      headerName: 'Items Quantity',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
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
            {/* {console.log(params)} */}
            <Link to={`/dashboard/myorders/${params.id}`}>
              <LaunchIcon />
            </Link>
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQuantity: item?.orderItems?.length,
        id: item?._id,
        status: item?.orderStatus,
        amount: item?.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            p: 2,
            height: 500,
            minHeight: '100vh',
            boxSizing: 'border-box',
            width: {
              xs: 'auto',
              md: '70%',
            },
          }}
        >
          {orders ? (
            <>
              <Box
                sx={{
                  p: 2,
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}
              >
                <Typography
                  variant="p"
                  color="primary.main"
                  textAlign="center"
                  sx={{ fontSize: '22px', fontWeight: 900 }}
                >
                  Your {orders?.length === 1 ? 'Order' : 'Orders'}
                </Typography>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </>
          ) : (
            <Box sx={{ p: 2 }}>
              <Typography textAlign="center" color="red">
                {' '}
                You did not order anything yet!{' '}
              </Typography>{' '}
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Orders;
