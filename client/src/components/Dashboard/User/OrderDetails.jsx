import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../../actions/orderAction';
import { Loader } from '../../Shared';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {console.log(order)}
          <h1>OrderDetails</h1>
        </>
      )}
    </>
  );
};

export default OrderDetails;
