import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
  getProductDetails,
} from '../../../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../../../constants/productConstant';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { Loader } from '../../../Shared';

const AllProductReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, product } = useSelector((state) => state.productDetails);
  const {
    error: reviewError,
    reviews,
    loading,
  } = useSelector((state) => state.productReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const [pageSize, setPageSize] = useState(5);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, id));
  };

  useEffect(() => {
    if (id?.length) {
      dispatch(getProductDetails(id));
      dispatch(getAllReviews(id));
    }

    if (error) {
      dispatch(clearErrors());
    }
    if (reviewError) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/dashboard/admin/product/reviews/${id}`);
      dispatch({
        type: DELETE_REVIEW_RESET,
      });
    }
  }, [dispatch, id, error, reviewError, deleteError, navigate, isDeleted]);

  const columns = [
    { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

    {
      field: 'user',
      headerName: 'User',
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: 'comment',
      headerName: 'Comment',
      minWidth: 350,
      flex: 1,
    },

    {
      field: 'rating',
      headerName: 'Rating',
      type: 'number',
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return (params.id, 'rating') >= 3 ? 'greenColor' : 'redColor';
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
            <Button onClick={() => deleteReviewHandler(params.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item?._id,
        rating: item?.rating,
        comment: item?.comment,
        user: item?.name,
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
          {reviews && reviews.length > 0 ? (
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
                List of {product && product?.name}'s Reviews
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
              <Typography variant="h6" textAlign={'center'} color={'red'}>
                No Reviews!
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default AllProductReviews;
