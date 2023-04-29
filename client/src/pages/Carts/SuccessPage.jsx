import React from 'react';
import { OrderSuccess } from '../../components/Cart';
import MetaData from '../../utils/MetaData';

const SuccessPage = () => {
  return (
    <>
      <MetaData title="Congratulations! Payment Succesfull!" />
      <OrderSuccess />
    </>
  );
};

export default SuccessPage;
