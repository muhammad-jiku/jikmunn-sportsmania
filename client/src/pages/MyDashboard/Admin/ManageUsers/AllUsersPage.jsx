import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { AllUsers } from '../../../../components/Dashboard';

const AllUsersPage = () => {
  return (
    <>
      <MetaData title="Users List - Admin Panel" />
      <AllUsers />
    </>
  );
};

export default AllUsersPage;
