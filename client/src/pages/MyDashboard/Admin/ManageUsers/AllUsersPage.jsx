import React from 'react';
import { AllUsers } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const AllUsersPage = () => {
  return (
    <>
      <MetaData title="Users List - Admin Panel" />
      <AllUsers />
    </>
  );
};

export default AllUsersPage;
