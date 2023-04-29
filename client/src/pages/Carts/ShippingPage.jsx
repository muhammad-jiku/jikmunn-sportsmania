import React from 'react';
import { Shipping } from '../../components/Cart';
import MetaData from '../../utils/MetaData';

const ShippingPage = () => {
  return (
    <>
      <MetaData title="Shippment Information" />
      <Shipping />
    </>
  );
};

export default ShippingPage;
