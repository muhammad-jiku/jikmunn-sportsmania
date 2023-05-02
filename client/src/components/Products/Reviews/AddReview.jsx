import React, { useEffect, useState } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
} from '@mui/material';
//  internal imports
import { reviewSchema } from '../../../utils/ValidationSchema';
import { clearErrors, newReview } from '../../../actions/productAction';
import { NEW_REVIEW_RESET } from '../../../constants/productConstant';

const AddReview = ({ open, setOpen, handleClickClose }) => {
  const alert = useAlert();
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.newReview);

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmitHandler = (values) => {
    const reviewInfo = {
      rating: rating,
      comment: values.comment,
      productId: id,
    };
    // console.log(reviewInfo);
    dispatch(newReview(reviewInfo));
    setOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }
  }, [dispatch, error, alert, success]);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClickClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle textAlign="center">Add Review</DialogTitle>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <DialogContent>
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
            size="large"
          />
          <TextField
            sx={{ mb: 2 }}
            multiline
            rows={4}
            label="Your valuable thoughts!"
            fullWidth
            required
            type={'text'}
            placeholder="Your valuable thoughts!"
            error={!!errors['comment']}
            helperText={errors['comment'] ? errors['comment'].message : ''}
            {...register('comment')}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              p: 1.8,
              mt: 2,
              fontSize: '12px',
            }}
          >
            Add Review
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddReview;
