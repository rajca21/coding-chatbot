import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo.png';
import { Typography } from '@mui/material';

const Logo: React.FC = () => {
  return (
    <div className='logoContainer'>
      <Link to={'/'}>
        <img src={LogoImg} alt='chatbot' />
      </Link>
      <Link to={'/'}>
        <Typography
          sx={{
            display: {
              md: 'block',
              sm: 'none',
              xs: 'none',
            },
            mr: 'auto',
            fontWeight: '800',
            textShadow: '2px 2px 20px #000',
          }}
        >
          <span>Coding</span>-GPT
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;
