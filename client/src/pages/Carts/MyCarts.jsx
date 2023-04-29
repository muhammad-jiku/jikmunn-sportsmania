import React from 'react';
import { Carts } from '../../components/Cart';
import MetaData from '../../utils/MetaData';

const MyCarts = () => {
  return (
    <>
      <MetaData title="My Carts" />
      <Carts />
    </>
  );
};

export default MyCarts;
