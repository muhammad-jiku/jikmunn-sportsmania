import React from 'react';
import { Orders } from '../../../components/Dashboard';
import MetaData from '../../../utils/MetaData';

const MyOrders = () => {
  return (
    <>
      <MetaData title="My Orders List" />
      <Orders />
    </>
  );
};

export default MyOrders;
