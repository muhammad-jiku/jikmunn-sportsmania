import React from 'react';
import { ProcessOrder } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const ProcessOrderPage = () => {
  return (
    <>
      <MetaData title="Order Management - Admin Panel" />
      <ProcessOrder />
    </>
  );
};

export default ProcessOrderPage;
