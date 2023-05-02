import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Carts } from '../../components/Cart';

const MyCarts = () => {
  return (
    <>
      <MetaData title="My Carts" />
      <Carts />
    </>
  );
};

export default MyCarts;
