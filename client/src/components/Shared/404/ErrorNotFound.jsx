import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import NotFound from '../../../assets/NotFound.gif';

const ErrorNotFound = () => {
  const NotFoundContainer = styled(Box)(({ matches, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 0px',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    minHeight: '80vh',
  }));

  const NotFoundImage = styled('img')(({ src, theme }) => ({
    src: `url(${src})`,
    // backgroundImage: `url(${src})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
    // opacity: '0.5',
    // width: '100%',
    // height: '40vh',
    // minHeight: '150vh',
  }));

  const NotFoundTitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontWeight: 400,
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '6px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
  }));

  const GotoHomeButton = styled(Button, {
    // Configure which props should be forwarded on DOM
    shouldForwardProp: (prop) => prop !== 'color',
    name: 'MyShopButton',
    slot: 'Root',
    // We are specifying here how the styleOverrides are being applied based on props
    overridesResolver: (props, styles) => [
      styles.root,
      props.color === 'primary' && styles.primary,
      props.color === 'secondary' && styles.secondary,
    ],
  })(({ theme }) => ({
    padding: '10px 15px',
    fontWeight: 400,
    fontSize: '18px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  }));

  return (
    <NotFoundContainer>
      <NotFoundImage src={`${NotFound}`} />
      <NotFoundTitle variant="h6">
        Ooops! The page you're looking is not found!
      </NotFoundTitle>
      <GotoHomeButton color="primary" href="/">
        Go to Home
      </GotoHomeButton>
    </NotFoundContainer>
  );
};

export default ErrorNotFound;
