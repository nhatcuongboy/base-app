import 'styled-components';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    // interface Theme extends CustomTheme {}
    interface Theme extends Record<string, any> {}
    interface ThemeOptions extends Record<string, any> {}
}

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme {}
}