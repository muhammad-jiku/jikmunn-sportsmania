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
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
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

  return (
    <Box>
      <Box>
        <Typography component="h1">Dashboard</Typography>

        <Box>
          <Box>
            <Typography variant="p">
              Total Amount <br />${totalAmount}
            </Typography>
          </Box>
          <Box>
            <Link to="/dashboard/admin/products">
              <Typography variant="p">Products</Typography>
              <Typography variant="p">
                {products && products?.length}
              </Typography>
            </Link>
            <Link to="/dashboard/admin/orders">
              <Typography variant="p">Orders</Typography>
              <Typography variant="p">{orders && orders?.length}</Typography>
            </Link>
            <Link to="/dashboard/admin/users">
              <Typography variant="p">Users</Typography>
              <Typography variant="p">{users && users?.length}</Typography>
            </Link>
          </Box>
        </Box>

        <Box>
          <Line data={lineState} />
        </Box>

        <Box>
          <Doughnut data={doughnutState} />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;
