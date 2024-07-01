import { Box, Paper, Typography } from '@mui/material';
import TransferForm from '../components/TransferForm';

const TransferPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        p: '2rem',
      }}
    >
      <Paper elevation={3} sx={{ width: '100%', maxWidth: '500px', p: '2rem' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Transfer funds
        </Typography>
        <TransferForm />
      </Paper>
    </Box>
  );
};

export default TransferPage;
