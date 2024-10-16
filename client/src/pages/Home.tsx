import { Box, useMediaQuery, useTheme } from '@mui/material';

import RobotImg from '../assets/logo.png';
import OpenAiImg from '../assets/openai.png';
import ChatImg from '../assets/chat.png';
import TypingAnimation from '../components/shared/TypingAnimation';
import Footer from '../components/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box width={'100%'} height={'100%'}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          mt: 3,
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column', sm: 'column' },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src={RobotImg}
            alt='robot'
            style={{ width: '200px', margin: 'auto' }}
          />
          <img
            className='image-inverted rotate'
            src={OpenAiImg}
            alt='openai'
            style={{ width: '200px', margin: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', mx: 'auto' }}>
          <img
            src={ChatImg}
            alt='chatbot'
            style={{
              display: 'flex',
              margin: 'auto',
              width: isBelowMd ? '80%' : '60%',
              borderRadius: 20,
              boxShadow: '-5px -5px 105px #64f3d5',
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
