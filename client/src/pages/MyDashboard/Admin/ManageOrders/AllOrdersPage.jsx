import React from 'react';
import { AllOrders } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const AllOrdersPage = () => {
  return (
    <>
      <MetaData title="Orders List - Admin Panel" />
      <AllOrders />
    </>
  );
};

export default AllOrdersPage;
