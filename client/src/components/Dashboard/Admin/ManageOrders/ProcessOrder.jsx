import React, { useEffect, useState } from 'react';
//  external imports
import { useAlert } from 'react-alert';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
//  internal imports
import { ErrorNotFound, Loader } from '../../../Shared';
import { UPDATE_ORDER_RESET } from '../../../../constants/orderConstant';
import {
  clearErrors,
  updateOrder,
  getOrderDetails,
} from '../../../../actions/orderAction';

const ProcessOrder = () => {
  const alert = useAlert();
  const { id } = useParams();

  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState(order ? order?.orderStatus : '');

  const orderDeliveryStatus = ['Processing', 'Shipped', 'Delivered'];

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('status', status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }
    if (updateError) {
      // console.log(updateError);
      alert.error('Failed to update order status!');
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Order Status Updated Successfully');
      dispatch({
        type: UPDATE_ORDER_RESET,
      });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, updateError, isUpdated, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!order && <ErrorNotFound />}
          {order && (
            <>
              <Box
                sx={{
                  p: 2,
                  width: {
                    xs: 'auto',
                    md: '70%',
                  },
                  boxSizing: 'border- box',
                }}
              >
                {/* Order Id */}
                <Box sx={{ py: 2, my: 2, boxSizing: 'border-box' }}>
                  <Typography
                    variant="span"
                    sx={{
                      p: 2,
                      mr: 2,
                      fontSize: '14px',
                      borderRadius: '50px',
                      // backgroundColor: 'lightgray',
                      backgroundColor: '#f2f2f2',
                    }}
                  >
                    Order{' '}
                    <Typography variant="span" color="primary.main">
                      #{order && order?._id?.slice(0, 5)}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="span"
                    sx={{
                      color: 'gray',
                      fontSize: '12px',
                    }}
                  >
                    Order Placed: {String(order?.createdAt).substr(0, 10)}
                  </Typography>
                </Box>
                <Divider />

                {/*  Shipment Details */}
                <Box sx={{ py: 2, my: 2, boxSizing: 'border-box' }}>
                  {/* Title */}
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="span"
                      sx={{ fontSize: '24px', fontWeight: 800 }}
                    >
                      Shipment Info
                    </Typography>
                  </Box>

                  {/*  Name & Phone */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row',
                      },
                    }}
                  >
                    {/*  user name */}
                    <TextField
                      fullWidth
                      variant="standard"
                      defaultValue={order?.user && order?.user?.name}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 0.5 }}
                    />
                    {/*  user phone */}
                    <TextField
                      fullWidth
                      variant="standard"
                      defaultValue={
                        order?.shippingInfo && order?.shippingInfo?.phoneNo
                      }
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 0.5 }}
                    />
                  </Box>

                  {/*  Address */}
                  <Box sx={{ my: 1 }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      defaultValue={
                        order?.shippingInfo &&
                        `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.pinCode}, ${order?.shippingInfo?.country}`
                      }
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 0.5 }}
                    />
                  </Box>

                  {/*  Total Amount */}
                  <Box sx={{ my: 1 }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      defaultValue={order?.totalPrice && order?.totalPrice}
                      InputProps={{
                        readOnly: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ m: 0.5 }}
                    />
                  </Box>

                  {/*  Payment & Order Status */}
                  <Box sx={{ mt: 1, pt: 2 }}>
                    <Button
                      sx={{
                        px: 2,
                        py: 1,
                        mr: 2,
                        fontWeight: 800,
                        borderRadius: '25px',
                        backgroundColor: '#f2f2f2',
                        color:
                          order?.paymentInfo &&
                          order?.paymentInfo?.status === 'succeeded'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {order?.paymentInfo &&
                      order?.paymentInfo?.status === 'succeeded'
                        ? 'PAID'
                        : 'NOT PAID'}
                    </Button>
                    <Button
                      sx={{
                        px: 2,
                        py: 1,
                        mr: 2,
                        fontWeight: 800,
                        borderRadius: '25px',
                        backgroundColor: '#f2f2f2',
                        color:
                          order?.orderStatus &&
                          order?.orderStatus === 'Delivered'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {order?.orderStatus && order?.orderStatus}
                    </Button>
                  </Box>
                </Box>
                <Divider />

                {/*  Order Items */}
                <Box sx={{ p: 2, my: 2, boxSizing: 'border-box' }}>
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <Box
                        key={item?.product}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box
                          sx={{
                            my: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={item?.image}
                            alt="Product"
                            height={75}
                            style={{ marginRight: '5px' }}
                          />
                          <Link
                            to={`/product/${item?.product}`}
                            style={{
                              color: 'black',
                              textDecoration: 'none',
                              textTransform: 'capitalize',
                            }}
                          >
                            {item?.name}
                          </Link>
                        </Box>
                        <Box>
                          <Typography variant="span">
                            {item?.quantity} X ${item?.price} =
                            <Typography variant="span">
                              {' '}
                              ${item?.price * item?.quantity}
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                </Box>
                <Divider />

                {/* Order Processing */}
                <Box sx={{ py: 2, my: 2, boxSizing: 'border-box' }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="span"
                      sx={{ fontSize: '18px', fontWeight: 700 }}
                    >
                      Order Status Process
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      ml: {
                        xs: 0,
                        md: 6,
                      },
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    {/* Order Status */}
                    <TextField
                      sx={{ mt: 2, pt: 1 }}
                      select
                      fullWidth
                      label="Order Status"
                      placeholder="Order Status"
                      required
                      defaultValue={order?.orderStatus || status}
                      onChange={(e) => setStatus(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountTreeIcon />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {order?.orderStatus === 'Processing' &&
                        orderDeliveryStatus.splice(
                          orderDeliveryStatus.indexOf('Delivered'),
                          1
                        ) &&
                        orderDeliveryStatus.map((os, idx) => (
                          <MenuItem
                            key={idx}
                            value={os}
                            label={'Order Stauts'}
                            placeholder={'Order Status'}
                          >
                            {os}
                          </MenuItem>
                        ))}

                      {(order?.orderStatus === 'Shipped' ||
                        order?.orderStatus === 'Delivered') &&
                        orderDeliveryStatus.splice(
                          orderDeliveryStatus.indexOf('Processing'),
                          1
                        ) &&
                        orderDeliveryStatus.map((os) => (
                          <MenuItem
                            key={os}
                            value={os}
                            label={'Order Stauts'}
                            placeholder={'Order Status'}
                          >
                            {os}
                          </MenuItem>
                        ))}
                    </TextField>

                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={
                        loading ? true : false || status === '' ? true : false
                      }
                      sx={{
                        p: 2,
                        mt: 2,
                      }}
                    >
                      Process
                    </Button>
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

export default ProcessOrder;
