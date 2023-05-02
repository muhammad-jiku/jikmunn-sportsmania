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
import { DELETE_PRODUCT_RESET } from '../../../../constants/productConstant';
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from '../../../../actions/productAction';

const AllProducts = () => {
  const alert = useAlert();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const [pageSize, setPageSize] = useState(5);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (deleteError) {
      //  console.log(deleteError);
      alert.error('Failed to delete the product!');
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Product Deleted Successfully');
      navigate('/dashboard/admin');
      dispatch({
        type: DELETE_PRODUCT_RESET,
      });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, alert, deleteError, isDeleted, navigate]);

  const columns = [
    {
      field: 'id',
      headerName: 'Product ID',
      minWidth: 200,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/dashboard/admin/product/reviews/${params.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Typography variant="span" color="gray">
                {params.id}
              </Typography>
            </Link>
          </>
        );
      },
    },

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
              <EditIcon
                sx={{
                  mt: 1,
                  // color: 'primary.main',
                  color: 'green',
                }}
              />
            </Link>

            <Button onClick={() => deleteProductHandler(params.id)}>
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
          {products && (
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
                List of All Products
              </Typography>

              <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={10}
                disableSelectionOnClick
                // autoHeight
                // rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default AllProducts;
