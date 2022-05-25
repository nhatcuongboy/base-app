// import colors from './Colors';
// import fontSize from './FontSizes';
// import spacing from './Spacing';
// import typography from './Typography';
import { createTheme } from '@mui/material/styles';
import { common } from "@mui/material/colors";

declare module '@mui/material/styles' {
  interface Theme extends Record<string, any> { }
  // allow configuration using `createTheme`
  interface ThemeOptions extends Record<string, any> { }
}

const DefaultTheme = createTheme();

const LightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  // body: {
  //   backgroundColor: common.white,
  //   textColor: common.black
  // },
});

const DarkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  // body: {
  //   backgroundColor: '#363537',
  //   textColor: common.white
  // },
});


export { DefaultTheme, LightTheme, DarkTheme };
