import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/userAction';
import { getAdminProduct } from '../../../actions/productAction';
import { getAllOrders } from '../../../actions/orderAction';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrders);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <Typography component="h1">Dashboard</Typography>

        <Box>
          <Box>
            <Typography variant="p">
              Total Amount <br />
              {/* ${totalAmount} */}
            </Typography>
          </Box>
          <Box>
            <Link to="/admin/products">
              <Typography variant="p">Product</Typography>
              <Typography variant="p">{products && products.length}</Typography>
            </Link>
            <Link to="/admin/orders">
              <Typography variant="p">Orders</Typography>
              <Typography variant="p">{orders && orders.length}</Typography>
            </Link>
            <Link to="/admin/users">
              <Typography variant="p">Users</Typography>
              <Typography variant="p">{users && users.length}</Typography>
            </Link>
          </Box>
        </Box>

        <Box>{/* <Line data={lineState} /> */}</Box>

        <Box>{/* <Doughnut data={doughnutState} /> */}</Box>
      </Box>
    </Box>
  );
};

export default AdminPanel;
