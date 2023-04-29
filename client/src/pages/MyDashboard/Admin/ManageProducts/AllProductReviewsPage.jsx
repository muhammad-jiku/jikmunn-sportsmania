import React from 'react';
import { AllProductReviews } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const AllProductReviewsPage = () => {
  return (
    <>
      <MetaData title="Product Reviews Management - Admin Panel" />
      <AllProductReviews />
    </>
  );
};

export default AllProductReviewsPage;
