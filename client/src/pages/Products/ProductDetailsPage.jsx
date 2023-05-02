import React from 'react';
//  internal import
import { ProductDetails } from '../../components/Products';

const ProductDetailsPage = ({ user }) => {
  return (
    <>
      <ProductDetails user={user} />
    </>
  );
};

export default ProductDetailsPage;
