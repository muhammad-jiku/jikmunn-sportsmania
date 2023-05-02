import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Auth } from '../../components/Auth';

const LoginPage = () => {
  return (
    <>
      <MetaData title="Login or Create an account" />
      <Auth />
    </>
  );
};

export default LoginPage;
