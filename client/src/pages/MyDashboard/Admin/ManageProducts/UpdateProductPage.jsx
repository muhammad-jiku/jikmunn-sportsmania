import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { UpdateProduct } from '../../../../components/Dashboard';

const UpdateProductPage = () => {
  return (
    <>
      <MetaData title="Product Management - Admin Panel" />
      <UpdateProduct />
    </>
  );
};

export default UpdateProductPage;
