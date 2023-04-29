import React from 'react';
import { Payment } from '../../components/Cart';
import MetaData from '../../utils/MetaData';

const PaymentPage = () => {
  return (
    <>
      <MetaData title="Payment Processing..." />
      <Payment />
    </>
  );
};

export default PaymentPage;
