import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/assets/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  body,
  input,
  textarea,
  select,
  table,
  button,
  code {
    font-family: 'Pretendard';
    color: ${({ theme }) => theme.colors.textPrimary};
  }

`;

export default GlobalStyle;
