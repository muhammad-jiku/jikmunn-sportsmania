import React from 'react';
//  internal imports
import MetaData from '../../../utils/MetaData';
import { OrderDetails } from '../../../components/Dashboard';

const MyOrderDetails = () => {
  return (
    <>
      <MetaData title="Order Information" />
      <OrderDetails />
    </>
  );
};

export default MyOrderDetails;
