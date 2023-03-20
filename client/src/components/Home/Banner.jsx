import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import SportsManiaBanner from '../../assets/white-banner.jpg';

const Banner = () => {
  const BannerContainer = styled(Box)(({ matches, theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '0px 0px',
    // background: Colors.light_gray,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    // backgroundImage: `url(/images/banner/banner.png)`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center",
    // backgroundSize: "cover"
  }));

  const BannerContent = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 420,
    padding: '30px',
  }));

  const BannerImage = styled(Box)(({ src, theme }) => ({
    // src: `url(${src})`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    opacity: '0.5',
    width: '100%',
    height: '40vh',
    minHeight: '150vh',
  }));

  const BannerTitle = styled(Typography)(({ matches, theme }) => ({
    lineHeight: 1.5,
    fontSize: '72px',
    marginBottom: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '42px',
    },
  }));

  const BannerDescription = styled(Typography)(({ theme }) => ({
    lineHeight: 1.25,
    letterSpacing: 1.25,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      lineHeight: 1.15,
      letterSpacing: 1.15,
      marginBottom: '1.5em',
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
    //   color: Colors.white,
    fontWeight: 'bold',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0px',
      fontSize: '14px',
    },
  }));

  return (
    // <BannerImage src={`${SportsManiaBanner}`} />
    <BannerContainer>
      <BannerImage src={`${SportsManiaBanner}`} />
      {/* <BannerContent>
             <Typography variant="h6">Huge Collection</Typography>
             <BannerTitle variant="h2">New Bags</BannerTitle>

             <BannerDescription variant="subtitle">
               Torem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmo
               tempor incididunt ut labore et dolore magna
             </BannerDescription>

             <BannerShopButton color="primary">Shop Now</BannerShopButton>
           </BannerContent> */}
    </BannerContainer>
  );
};

export default Banner;
