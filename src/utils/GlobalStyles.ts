import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body.backgroundColor};
    color: ${({ theme }) => theme.body.textColor};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // transition: all 0.50s linear;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  `