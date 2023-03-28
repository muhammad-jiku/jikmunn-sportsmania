import React, { useState } from 'react';
import { Box, Container, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import Login from './Login';
import Registration from './Registration';

const Auth = () => {
  const [value, setValue] = useState('login');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          p: 2,
          width: '100%',
          typography: 'body1',
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="login" />
              <Tab label="Registration" value="registration" />
            </TabList>
          </Box>
          <TabPanel value="login">
            <Login />
          </TabPanel>
          <TabPanel value="registration">
            <Registration />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Auth;
