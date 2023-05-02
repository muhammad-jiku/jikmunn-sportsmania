import React from 'react';
//  internal imports
import MetaData from '../../../../utils/MetaData';
import { AdminPanel } from '../../../../components/Dashboard';

const AdminPanelPage = () => {
  return (
    <>
      <MetaData title="Dashboard - Admin Panel" />
      <AdminPanel />
    </>
  );
};

export default AdminPanelPage;
