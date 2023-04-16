import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  deleteReviews,
  getAllReviews,
} from '../../../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../../../constants/productConstant';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import { DataGrid } from '@mui/x-data-grid';

const AllProductReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState(`${id}`);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    console.log(productId);
    console.log(productId.length);
    if (productId.length) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate(`/dashboard/admin/product/reviews/${productId}`);
      dispatch({
        type: DELETE_REVIEW_RESET,
      });
    }
  }, [dispatch, productId, error, deleteError, navigate, isDeleted]);

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
      <Box>
        <Box>
          <form onSubmit={productReviewsSubmitHandler}>
            <Typography variant="h7">ALL REVIEWS</Typography>

            <Box>
              <StarIcon />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </Box>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === '' ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          ) : (
            <Typography variant="h7">No Reviews Found</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default AllProductReviews;
