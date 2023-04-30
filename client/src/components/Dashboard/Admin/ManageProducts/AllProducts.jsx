import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from '../../../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { DELETE_PRODUCT_RESET } from '../../../../constants/productConstant';
import { Loader } from '../../../Shared';

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
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
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
            {/* {console.log(params.id)} */}
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
                variant="p"
                color="primary.main"
                textAlign="center"
                sx={{ fontSize: '22px', fontWeight: 900 }}
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
