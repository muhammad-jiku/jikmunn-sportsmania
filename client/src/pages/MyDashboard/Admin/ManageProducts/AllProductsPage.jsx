import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { AllProducts } from '../../../../components/Dashboard';

const AllProductsPage = () => {
  return (
    <>
      <MetaData title="Products List - Admin Panel" />
      <AllProducts />
    </>
  );
};

export default AllProductsPage;
