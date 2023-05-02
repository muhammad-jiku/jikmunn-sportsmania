import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { UpdateUser } from '../../../../components/Dashboard';

const UpdateUserPage = () => {
  return (
    <>
      <MetaData title="User Role Management - Admin Panel" />
      <UpdateUser />
    </>
  );
};

export default UpdateUserPage;
