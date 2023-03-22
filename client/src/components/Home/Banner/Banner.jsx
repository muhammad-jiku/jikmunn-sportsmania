import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import SportsManiaBanner from '../../../assets/images/sportsBanner.jpeg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Banner = () => {
  const BannerContainer = styled(Box)(({ matches, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 0px',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: `url(${SportsManiaBanner})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: '40vh',
    minHeight: '150vh',
  }));

  const BannerContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 600,
    padding: '0 30px',
  }));

  const BannerTitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontSize: '40px',
    fontWeight: 800,
    marginBottom: '6px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
    },
  }));

  const BannerSubtitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontSize: '30px',
    fontWeight: 600,
    marginBottom: '6px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  }));

  const BannerDescription = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: '1em',
    fontWeight: 400,
    fontSize: '18px',
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.down('md')]: {
      lineHeight: 1.15,
      letterSpacing: 1.15,
    },
  }));

  const BannerShopButton = styled(Button, {
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
    padding: '20px 0px',
    fontWeight: 400,
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px',
      fontSize: '18px',
    },
  }));

  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle variant="h2">
          Welcome to{' '}
          <Typography variant="span" color="primary">
            Sports Mania!
          </Typography>
        </BannerTitle>
        <BannerSubtitle variant="h6">Huge Sports Collection</BannerSubtitle>
        <BannerDescription variant="subtitle">
          You will find here amazing collections of sports around the globe.
          This is the best online sports shop where you can find your favorite
          player or team's jersey, kit, retro shirt, and also toys for kids.
        </BannerDescription>

        <BannerShopButton color="primary" href="#products">
          Shop Now{' '}
          <ShoppingCartIcon
            sx={{
              ml: 1,
            }}
          />
        </BannerShopButton>
      </BannerContent>
    </BannerContainer>
  );
};

export default Banner;
