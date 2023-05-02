import React from 'react';
//  external import
import { Box, styled } from '@mui/material';
//  internal import
import Loading from '../../assets/gifs/loadinn.gif';

const Loader = () => {
  const LoaderContainer = styled(Box)(({ matches, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 0px',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '80vh',
  }));

  const LoaderImage = styled('img')(({ src, theme }) => ({
    src: `url(${src})`,
  }));
  return (
    <LoaderContainer>
      <LoaderImage src={`${Loading}`} />
    </LoaderContainer>
  );
};

export default Loader;
