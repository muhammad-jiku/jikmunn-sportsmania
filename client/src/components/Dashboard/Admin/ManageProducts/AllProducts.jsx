import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
} from '../../../../actions/productAction';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';

const AllProducts = () => {
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getAdminProduct());
  }, [dispatch, error]);

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'price',
      headerName: 'Price',
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
            <Link to={`/dashboard/admin/product/update/${params.id}`}>
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item?._id,
        stock: item?.stock,
        price: item?.price,
        name: item?.name,
      });
    });

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h6" id="productListHeading">
            ALL PRODUCTS
          </Typography>

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

export default AllProducts;
