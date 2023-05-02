import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { AllProductReviews } from '../../../../components/Dashboard';

const AllProductReviewsPage = () => {
  return (
    <>
      <MetaData title="Product Reviews Management - Admin Panel" />
      <AllProductReviews />
    </>
  );
};

export default AllProductReviewsPage;
