import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Payment } from '../../components/Cart';

const PaymentPage = () => {
  return (
    <>
      <MetaData title="Payment Processing..." />
      <Payment />
    </>
  );
};

export default PaymentPage;
