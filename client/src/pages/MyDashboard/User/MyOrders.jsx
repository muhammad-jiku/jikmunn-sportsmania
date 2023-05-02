import React from 'react';
//  internal imports
import MetaData from '../../../utils/MetaData';
import { Orders } from '../../../components/Dashboard';

const MyOrders = () => {
  return (
    <>
      <MetaData title="My Orders List" />
      <Orders />
    </>
  );
};

export default MyOrders;
