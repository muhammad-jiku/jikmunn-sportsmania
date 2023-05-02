import React from 'react';
//  internal imports
import MetaData from '../../utils/MetaData';
import { Banner, Products } from '../../components/Home';

const Homepage = () => {
  return (
    <>
      <MetaData title="Sports Mania" />
      <Banner />
      <Products />
    </>
  );
};

export default Homepage;
