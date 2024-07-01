import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, useTheme } from '@mui/material';
import routeNames from '../../pages/routeNames';

interface SidebarProps {
  onLinkClick?: () => void;
}

const Sidebar = ({ onLinkClick }: SidebarProps) => {
  const theme = useTheme();
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <Box
      sx={{
        width: '300px',
        minHeight: '100vh',
        backgroundColor: theme.palette.custom.sidebarBackground,
        p: '1rem',
      }}
    >
      <Typography
        variant='h6'
        sx={{
          color: 'white',
          textAlign: 'center',
          mb: '1rem',
        }}
      >
        BANK APP
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Button
          component={RouterLink}
          to={routeNames.home}
          variant='contained'
          sx={{ background: theme.palette.custom.button }}
          onClick={handleLinkClick}
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to={routeNames.createAccount}
          variant='contained'
          sx={{ background: theme.palette.custom.button }}
          onClick={handleLinkClick}
        >
          Create account
        </Button>
        <Button
          component={RouterLink}
          to={routeNames.accountList}
          variant='contained'
          sx={{ background: theme.palette.custom.button }}
          onClick={handleLinkClick}
        >
          Account list
        </Button>
        <Button
          component={RouterLink}
          to={routeNames.transferFunds}
          variant='contained'
          sx={{ background: theme.palette.custom.button }}
          onClick={handleLinkClick}
        >
          Transfer funds
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
