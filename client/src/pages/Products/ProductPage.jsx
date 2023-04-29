import React from 'react';
import { Products } from '../../components/Products';
import MetaData from '../../utils/MetaData';

const ProductPage = () => {
  return (
    <>
      <MetaData title="Sports Mania's Products" />
      <Products />
    </>
  );
};

export default ProductPage;
