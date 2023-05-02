import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { AllOrders } from '../../../../components/Dashboard';

const AllOrdersPage = () => {
  return (
    <>
      <MetaData title="Orders List - Admin Panel" />
      <AllOrders />
    </>
  );
};

export default AllOrdersPage;
