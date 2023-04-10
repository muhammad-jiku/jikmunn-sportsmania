import React from 'react';
import { Stepper, Step, StepLabel, Typography, useTheme } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const CheckoutSteps = ({ activeStep }) => {
  const theme = useTheme();
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
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
            icon={item.icon}
          >
            {item.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutSteps;
