import React from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckoutSteps = ({ activeStep }) => {
  const theme = useTheme();
  const steps = [
    {
      label: (
        <Typography
          sx={{
            fontSize: {
              xs: '11px',
              sm: '14px',
              md: '16px',
            },
          }}
        >
          Shipping Details
        </Typography>
      ),
      icon: <LocalShippingIcon />,
    },
    {
      label: (
        <Typography
          sx={{
            fontSize: {
              xs: '11px',
              sm: '14px',
              md: '16px',
            },
          }}
        >
          Confirm Order
        </Typography>
      ),
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: (
        <Typography
          sx={{
            fontSize: {
              xs: '11px',
              sm: '14px',
              md: '16px',
            },
          }}
        >
          Payment
        </Typography>
      ),
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color:
                  activeStep >= index
                    ? `${theme.palette.primary.main}`
                    : 'rgba(0, 0, 0, 0.649)',
              }}
              icon={item?.icon}
            >
              {item?.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
