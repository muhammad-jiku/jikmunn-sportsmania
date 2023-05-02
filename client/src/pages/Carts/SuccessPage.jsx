import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { OrderSuccess } from '../../components/Cart';

const SuccessPage = () => {
  return (
    <>
      <MetaData title="Congratulations! Payment Succesfull!" />
      <OrderSuccess />
    </>
  );
};

export default SuccessPage;
