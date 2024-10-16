import { Box, Button, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

import AiRobot from '../assets/airobot.png';
import CustomizedInput from '../components/shared/CustomizedInput';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      toast.loading('Signing up...', { id: 'register' });
      await auth?.register(name, email, password);
      toast.success('Signed up successfully!', { id: 'register' });
    } catch (error) {
      toast.error('Something went wrong while signing up!', {
        id: 'register',
      });
      console.error(error);
    }
  };

  return (
    <Box className='loginContainer'>
      <Box
        padding={8}
        mt={8}
        display={{
          lg: 'flex',
          xs: 'none',
        }}
      >
        <img src={AiRobot} alt='airobot' />
      </Box>
      <Box
        display={'flex'}
        flex={{
          lg: 0.5,
          xs: 1,
        }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              textAlign='center'
              padding={2}
              fontWeight={600}
            >
              Register
            </Typography>
            <CustomizedInput name='name' type='text' label='Name' />
            <CustomizedInput name='email' type='email' label='Email' />
            <CustomizedInput name='password' type='password' label='Password' />
            <Button
              type='submit'
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: '400px',
                borderRadius: 2,
                bgcolor: '#00fffc',
                ':hover': {
                  bgcolor: 'white',
                  color: 'black',
                },
              }}
            >
              register
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
