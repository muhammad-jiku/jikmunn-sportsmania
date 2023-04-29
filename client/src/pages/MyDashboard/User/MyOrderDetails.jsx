import React from 'react';
import { OrderDetails } from '../../../components/Dashboard';
import MetaData from '../../../utils/MetaData';

const MyOrderDetails = () => {
  return (
    <>
      <MetaData title="Order Information" />
      <OrderDetails />
    </>
  );
};

export default MyOrderDetails;
