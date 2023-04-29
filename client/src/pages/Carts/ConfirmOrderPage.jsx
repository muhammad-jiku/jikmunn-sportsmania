import React from 'react';
import { ConfirmOrder } from '../../components/Cart';
import MetaData from '../../utils/MetaData';

const ConfirmOrderPage = () => {
  return (
    <>
      <MetaData title="Confirming Order..." />
      <ConfirmOrder />
    </>
  );
};

export default ConfirmOrderPage;
