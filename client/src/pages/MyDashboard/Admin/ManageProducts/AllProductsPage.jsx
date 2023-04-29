import React from 'react';
import { AllProducts } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const AllProductsPage = () => {
  return (
    <>
      <MetaData title="Products List - Admin Panel" />
      <AllProducts />
    </>
  );
};

export default AllProductsPage;
