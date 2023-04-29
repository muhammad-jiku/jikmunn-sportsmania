import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_ORDER_RESET } from '../../../../constants/orderConstant';
import {
  clearErrors,
  updateOrder,
  getOrderDetails,
} from '../../../../actions/orderAction';
import { Loader } from '../../../Shared';
import { Box, Button, Typography } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const ProcessOrder = () => {
  const alert = useAlert();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState('');

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Order Updated Successfully');
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, updateError, isUpdated, id]);

  return (
    <>
      <Box>
        {/* {console.log(order)} */}
        <Box>
          {loading ? (
            <Loader />
          ) : (
            <Box
              sx={{
                display: order?.orderStatus === 'Delivered' ? 'block' : 'grid',
              }}
            >
              <Box>
                <Box>
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
                          order?.paymentInfo.status === 'succeeded'
                            ? 'green'
                            : 'red'
                        }
                      >
                        {order?.paymentInfo &&
                        order?.paymentInfo.status === 'succeeded'
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
                  <Typography>Your Cart Items:</Typography>
                  <Box>
                    {order?.orderItems &&
                      order?.orderItems.map((item) => (
                        <Box key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{' '}
                          <Typography variant="span">
                            {item.quantity} X ${item.price} ={' '}
                            <b>${item.price * item.quantity}</b>
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Box>
              {/*  */}
              <Box
                sx={{
                  display:
                    order?.orderStatus === 'Delivered' ? 'none' : 'block',
                }}
              >
                <form onSubmit={updateOrderSubmitHandler}>
                  <Typography variant="h7">Process Order</Typography>

                  <Box>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order?.orderStatus === 'Processing' && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order?.orderStatus === 'Shipped' && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </Box>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === '' ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProcessOrder;
