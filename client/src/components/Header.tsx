import React from 'react';
import { AppBar, Toolbar } from '@mui/material';

import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header: React.FC = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg='#00fffc'
                to='/chat'
                text='Chat'
                textColor='black'
              />
              <NavigationLink
                bg='#51538f'
                to='/'
                text='Logout'
                textColor='white'
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg='#00fffc'
                to='/login'
                text='Login'
                textColor='black'
              />
              <NavigationLink
                bg='#51538f'
                to='/register'
                text='Register'
                textColor='white'
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
