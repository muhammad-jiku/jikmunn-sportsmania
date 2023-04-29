import React from 'react';
import { Auth } from '../../components/Auth';
import MetaData from '../../utils/MetaData';

const LoginPage = () => {
  return (
    <>
      <MetaData title="Login or Create an account" />
      <Auth />
    </>
  );
};

export default LoginPage;
