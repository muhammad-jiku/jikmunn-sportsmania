import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { ConfirmOrder } from '../../components/Cart';

const ConfirmOrderPage = () => {
  return (
    <>
      <MetaData title="Confirming Order..." />
      <ConfirmOrder />
    </>
  );
};

export default ConfirmOrderPage;
