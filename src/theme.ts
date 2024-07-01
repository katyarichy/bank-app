import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      button: string;
      sidebarBackground: string;
    };
  }

  interface PaletteOptions {
    custom?: {
      button?: string;
      sidebarBackground?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    custom: {
      button: '#394966',
      sidebarBackground: '#202837',
    },
  },
} as ThemeOptions);

export default theme;
