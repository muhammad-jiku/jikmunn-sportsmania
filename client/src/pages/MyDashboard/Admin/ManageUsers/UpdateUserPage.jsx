import React from 'react';
import { UpdateUser } from '../../../../components/Dashboard';
import MetaData from '../../../../utils/MetaData';

const UpdateUserPage = () => {
  return (
    <>
      <MetaData title="User Role Management - Admin Panel" />
      <UpdateUser />
    </>
  );
};

export default UpdateUserPage;
