import React from 'react';
import { Profile } from '../../components/Dashboard';
import MetaData from '../../utils/MetaData';

const MyProfile = () => {
  return (
    <>
      <MetaData title="My Profile" />
      <Profile />
    </>
  );
};

export default MyProfile;
