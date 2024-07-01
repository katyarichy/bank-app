import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
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
      <Typography>Page not found!</Typography>
    </Box>
  );
};

export default NotFoundPage;
