import { Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        p: '2rem',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome to the BANK APP
      </Typography>
      <Typography>Manage your bank accounts efficiently and easily.</Typography>
    </Box>
  );
};

export default HomePage;
