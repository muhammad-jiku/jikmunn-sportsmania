import React from 'react';
import { SecureProfile } from '../../components/Dashboard';
import MetaData from '../../utils/MetaData';

const SecureMyProfile = () => {
  return (
    <>
      <MetaData title="Secure Profile" />
      <SecureProfile />
    </>
  );
};

export default SecureMyProfile;
