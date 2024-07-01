import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  useMediaQuery,
  useTheme,
  IconButton,
  SwipeableDrawer,
  ThemeProvider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RouterMapping from './pages/RouterMapping';
import Sidebar from './components/Sidebar';
import theme from './theme';
import './App.css';

const App = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box display='flex'>
          <CssBaseline />
          {isMobile ? (
            <>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{
                  mt: 2,
                  ml: 2,
                  textAlign: 'left',
                  alignSelf: 'baseline',
                }}
              >
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor='left'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                onOpen={handleDrawerToggle}
              >
                <Sidebar onLinkClick={handleDrawerToggle} />
              </SwipeableDrawer>
            </>
          ) : (
            <Sidebar />
          )}
          <Box component='main' sx={{ flexGrow: 1 }}>
            <RouterMapping />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
