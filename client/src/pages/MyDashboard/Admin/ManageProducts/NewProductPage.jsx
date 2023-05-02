import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { NewProduct } from '../../../../components/Dashboard';

const NewProductPage = () => {
  return (
    <>
      <MetaData title="New Product - Admin Panel" />
      <NewProduct />
    </>
  );
};

export default NewProductPage;
