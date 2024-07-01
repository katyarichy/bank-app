import { Box, Paper, Typography } from '@mui/material';
import AccountForm from '../components/AccountForm';

const CreateAccountPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{ width: '100%', maxWidth: '500px', padding: '2rem' }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Create account
        </Typography>
        <AccountForm />
      </Paper>
    </Box>
  );
};

export default CreateAccountPage;
