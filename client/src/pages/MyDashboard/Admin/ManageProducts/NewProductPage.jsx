import React from 'react';
import { NewProduct } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const NewProductPage = () => {
  return (
    <>
      <MetaData title="New Product - Admin Panel" />
      <NewProduct />
    </>
  );
};

export default NewProductPage;
