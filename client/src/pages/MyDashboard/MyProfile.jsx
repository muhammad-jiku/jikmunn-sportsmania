import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Profile } from '../../components/Dashboard';

const MyProfile = () => {
  return (
    <>
      <MetaData title="My Profile" />
      <Profile />
    </>
  );
};

export default MyProfile;
