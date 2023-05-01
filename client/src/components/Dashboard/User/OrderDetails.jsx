import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { clearErrors, getOrderDetails } from '../../../actions/orderAction';
import { ErrorNotFound, Loader } from '../../Shared';
import {
  Box,
  Button,
  Divider,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const OrderDetails = () => {
  const futureDate = new Date(
    Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 10
  );

  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      // console.log(error);
      alert.error('Something Went Wrong!');
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!order && <ErrorNotFound />}
          {order && (
            <>
              {/* {console.log(order)} */}
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
                    {order?.orderStatus === 'Shipped' && (
                      <Box sx={{ pt: 2 }}>
                        <Typography
                          variant="span"
                          sx={{
                            my: 2,
                            color: 'gray',
                            fontSize: '12px',
                          }}
                        >
                          Will be delivered on:{' '}
                          {String(futureDate).substr(0, 10)}
                        </Typography>
                      </Box>
                    )}
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
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default OrderDetails;
