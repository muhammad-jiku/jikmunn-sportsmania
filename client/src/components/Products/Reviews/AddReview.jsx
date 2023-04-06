import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const AddReview = ({ open, handleClickClose }) => {
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClickClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose}>Disagree</Button>
        <Button onClick={handleClickClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
