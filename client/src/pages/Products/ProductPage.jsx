import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Products } from '../../components/Products';

const ProductPage = () => {
  return (
    <>
      <MetaData title="Sports Mania's Products" />
      <Products />
    </>
  );
};

export default ProductPage;
