import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Shipping } from '../../components/Cart';

const ShippingPage = () => {
  return (
    <>
      <MetaData title="Shippment Information" />
      <Shipping />
    </>
  );
};

export default ShippingPage;
