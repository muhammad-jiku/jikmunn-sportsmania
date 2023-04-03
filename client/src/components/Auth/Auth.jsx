import React, { useState } from 'react';
import { Box, Container, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import Login from './Login/Login';
import Registration from './Registration/Registration';

const Auth = () => {
  const [authProcess, setAuthProcess] = useState('login');

  const handleChange = (e, newAuthProcess) => {
    setAuthProcess(newAuthProcess);
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
        {/* {console.log(authProcess)} */}
        <TabContext value={authProcess}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Login" value="login" />
              <Tab label="Registration" value="registration" />
            </TabList>
          </Box>
          <TabPanel value={authProcess}>
            {authProcess === 'login' ? (
              <Login setAuthProcess={setAuthProcess} />
            ) : (
              <Registration setAuthProcess={setAuthProcess} />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Auth;
