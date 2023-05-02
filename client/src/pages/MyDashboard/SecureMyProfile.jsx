import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { SecureProfile } from '../../components/Dashboard';

const SecureMyProfile = () => {
  return (
    <>
      <MetaData title="Secure Profile" />
      <SecureProfile />
    </>
  );
};

export default SecureMyProfile;
