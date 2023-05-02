import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { ProcessOrder } from '../../../../components/Dashboard';

const ProcessOrderPage = () => {
  return (
    <>
      <MetaData title="Order Management - Admin Panel" />
      <ProcessOrder />
    </>
  );
};

export default ProcessOrderPage;
