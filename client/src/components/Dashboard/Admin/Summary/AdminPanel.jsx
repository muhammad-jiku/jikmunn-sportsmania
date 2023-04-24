import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../../actions/userAction';
import { getAdminProduct } from '../../../../actions/productAction';
import { getAllOrders } from '../../../../actions/orderAction';
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrders);
  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock <= 10) {
        outOfStock += 1;
      }
    });
  console.log(outOfStock);
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getAdminProduct());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(236, 109, 87)'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'In Stock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products?.length - outOfStock],
      },
    ],
  };

  const options = {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Disable aspect ratio
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="p"
        sx={{
          mt: 2,
          fontSize: {
            xs: '18px',
            md: '26px',
          },
          fontWeight: 900,
        }}
      >
        {user?.name ? user?.name + "'s" : ''} Dashboard
      </Typography>{' '}
      <Typography
        variant="p"
        sx={{
          p: 2,
          my: 2,
          width: {
            xs: '80%',
            md: '50%',
          },
          color: 'whitesmoke',
          textAlign: 'center',
          backgroundColor: 'primary.main',
          fontSize: {
            xs: '14px',
            md: '20px',
          },
        }}
      >
        Total Amount ${totalAmount}
      </Typography>
      {/*  Controllers */}
      <Box
        sx={{
          p: 2,
          mx: {
            xs: 0,
            md: 6,
          },
          display: 'flex',
          // flexDirection: {
          //   xs: 'column',
          //   md: 'row',
          // },
          justifyContent: {
            // xs: 'space-between',
            xs: 'space-around',
            md: 'center',
          },
          alignItems: 'center',
        }}
      >
        {/*  Users */}
        <Link to="/dashboard/admin/users" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              width: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              color: 'whitesmoke',
              backgroundColor: '#779203',
              borderRadius: '50%',
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '14px',
                  sm: '20px',
                  md: '26px',
                },
                fontWeight: 900,
              }}
            >
              {users && users?.length === 1 ? 'User' : 'Users'}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '12px',
                  sm: '16px',
                  md: '20px',
                },
                fontWeight: 700,
              }}
            >
              {users && users?.length}
            </Typography>
          </Box>
        </Link>

        {/*  Products */}
        <Link to="/dashboard/admin/products" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              width: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              color: 'whitesmoke',
              backgroundColor: '#BDA305',
              borderRadius: '50%',
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '14px',
                  sm: '20px',
                  md: '26px',
                },
                fontWeight: 900,
              }}
            >
              {products && products?.length === 1 ? 'Product' : 'Products'}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '12px',
                  sm: '16px',
                  md: '20px',
                },
                fontWeight: 700,
              }}
            >
              {products && products?.length}
            </Typography>
          </Box>
        </Link>

        {/* Orders */}
        <Link to="/dashboard/admin/orders" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              width: {
                xs: '90px',
                sm: '150px',
                md: '250px',
              },
              color: 'whitesmoke',
              backgroundColor: '#0D838E',
              borderRadius: '50%',
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '14px',
                  sm: '20px',
                  md: '26px',
                },
                fontWeight: 900,
              }}
            >
              {orders && orders?.length === 1 ? 'Order' : 'Orders'}
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontSize: {
                  xs: '12px',
                  sm: '16px',
                  md: '20px',
                },
                fontWeight: 700,
              }}
            >
              {orders && orders?.length}
            </Typography>
          </Box>
        </Link>
      </Box>
      {/*  Line Chart */}
      <Box
        sx={{
          px: 1,
          py: 2,
          // boxSizing: 'border-box',
          margin: 'auto',
          width: '100%',
          height: {
            xs: 300,
            md: 400,
          },
        }}
      >
        <Line data={lineState} options={options} />
      </Box>
      {/*  Doughnut Chart */}
      <Box
        sx={{
          px: 1,
          py: 2,
          // boxSizing: 'border-box',
          margin: 'auto',
          width: '100%',
          height: {
            xs: 300,
            md: 400,
          },
        }}
      >
        <Doughnut data={doughnutState} options={options} />
      </Box>
    </Box>
  );
};

export default AdminPanel;
