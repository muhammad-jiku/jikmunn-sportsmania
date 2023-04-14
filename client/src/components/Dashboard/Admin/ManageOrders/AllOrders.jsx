import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAllOrders } from '../../../../actions/orderAction';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AllOrders = () => {
  const dispatch = useDispatch();

  const { error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getAllOrders());
  }, [dispatch, error]);

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
      headerName: 'Items Qty',
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
              <EditIcon />
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
      <Box>
        <Box>
          <Typography variant="h6">ALL ORDERS</Typography>

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

export default AllOrders;
