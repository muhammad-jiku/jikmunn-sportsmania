import React from 'react';
import { ProductDetails } from '../../components/Products';

const ProductDetailsPage = ({ user }) => {
  return (
    <>
      <ProductDetails user={user} />
    </>
  );
};

export default ProductDetailsPage;
