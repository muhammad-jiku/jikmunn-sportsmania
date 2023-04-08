import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../../actions/orderAction';
import { Loader } from '../../Shared';
import { Typography } from '@mui/material';

const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

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
        <>
          {console.log(orders)}
          <Typography>{user?.name}'s Orders</Typography>
        </>
      )}
    </>
  );
};

export default Orders;
