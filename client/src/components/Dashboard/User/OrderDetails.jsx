import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../../actions/orderAction';
import { ErrorNotFound, Loader } from '../../Shared';
import { Box, Typography } from '@mui/material';

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
          {!order && <ErrorNotFound />}
          {order && (
            <>
              {console.log(order)}
              <Box sx={{ p: 2 }}>
                <Box>
                  <Typography component="h1">
                    Order #{order && order?._id}
                  </Typography>
                  <Typography>Shipping Info</Typography>
                  <Box>
                    <Box>
                      <Typography variant="p">Name:</Typography>
                      <Typography variant="span">
                        {order?.user && order?.user.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="p">Phone:</Typography>
                      <Typography variant="span">
                        {order?.shippingInfo && order?.shippingInfo.phoneNo}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="p">Address:</Typography>
                      <Typography variant="span">
                        {order?.shippingInfo &&
                          `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography>Payment</Typography>
                  <Box>
                    <Box>
                      <Typography
                        variant="p"
                        color={
                          order?.paymentInfo &&
                          order?.paymentInfo?.status === 'succeeded'
                            ? 'green'
                            : 'red'
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo?.status === 'succeeded'
                          ? 'PAID'
                          : 'NOT PAID'}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="p">Amount:</Typography>
                      <Typography variant="span">
                        {order?.totalPrice && order?.totalPrice}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography>Order Status</Typography>
                  <Box>
                    <Box>
                      <Typography
                        variant="p"
                        color={
                          order?.orderStatus &&
                          order?.orderStatus === 'Delivered'
                            ? 'green'
                            : 'red'
                        }
                      >
                        {order?.orderStatus && order?.orderStatus}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Typography>Order Items:</Typography>
                  <Box>
                    {order?.orderItems &&
                      order?.orderItems.map((item) => (
                        <Box key={item?.product}>
                          <img src={item?.image} alt="Product" width={225} />
                          <Link to={`/product/${item?.product}`}>
                            {item?.name}
                          </Link>
                          <Typography variant="span">
                            {item?.quantity} X ${item?.price} =
                            <Typography variant="h7">
                              ${item?.price * item?.quantity}
                            </Typography>
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetails;
