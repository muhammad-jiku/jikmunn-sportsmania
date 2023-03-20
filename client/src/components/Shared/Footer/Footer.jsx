import React from 'react';
import {
  Box,
  Button,
  Grid,
  List,
  ListItemText,
  Stack,
  styled,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';

const Footer = () => {
  const theme = useTheme();

  const FooterTitle = styled(Typography)(() => ({
    textTransform: 'uppercase',
    marginBottom: '1em',
  }));

  const SubscribeTf = styled(TextField)(() => ({
    '.MuiInputLabel-root': {
      color: `${theme.palette.primary.main}`,
    },
    input: {
      color: `${theme.palette.primary.main}`,
    },
    // fontColor: `${theme.palette.primary.main}`,

    '.MuiInput-root::before': {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  }));
  return (
    <Box
      sx={{
        mt: 'auto',
        color: 'white',
        backgroundColor: `secondary.main`,
        p: {
          xs: 4,
          md: 10,
        },
        pt: 12,
        pb: 12,
        fontSize: {
          xs: '12px',
          md: '14px',
        },
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">About us</FooterTitle>
          <Typography variant="caption2">
            Thanks for visiting us. You can also connect with us via social
            media.
          </Typography>
          <Box
            sx={{
              mt: 4,
              color: `${theme.palette.primary.main}`,
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                About Us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Order Tracking
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">my account</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Login
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                My Cart
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                My Account
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Wishlist
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">newsletter</FooterTitle>
          <Stack>
            <SubscribeTf label="Email Address" variant="standard" />
            <Button
              startIcon={<SendIcon />}
              sx={{
                mt: 4,
                mb: 4,
              }}
              variant="contained"
            >
              Subscribe
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
