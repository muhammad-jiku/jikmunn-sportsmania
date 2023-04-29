import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../../actions/orderAction';
import { Loader } from '../../Shared';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import { useAlert } from 'react-alert';

const Orders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const [pageSize, setPageSize] = useState(5);

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
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
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
                // pageSize={10}
                disableSelectionOnClick
                // autoHeight
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </Box>
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
