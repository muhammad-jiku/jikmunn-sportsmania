import React from 'react';
import { Banner, Products } from '../../components/Home';
import MetaData from '../../utils/MetaData';

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
