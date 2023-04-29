import React from 'react';
import { UpdateProduct } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const UpdateProductPage = () => {
  return (
    <>
      <MetaData title="Product Management - Admin Panel" />
      <UpdateProduct />
    </>
  );
};

export default UpdateProductPage;
