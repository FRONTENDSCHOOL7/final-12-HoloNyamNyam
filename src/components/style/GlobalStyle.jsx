import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

 :root{
    --main-color: #036635 ;
    --sub-color:#B1D4C3;
    --font-color: #000000;
    --sub-font-color: #767676;;
    --border-color: #DBDBDB ;
    --background-color: #F2F2F2;
    --error-color: #EB5757;
    --font-xl : 20px;
    --font-lg : 16px;
    --font-md : 14px;
    --font-sm : 12px;
  }

    :root {
    --font--bold: 700;
    --font--semibold: 500;
    --font-regular: 400;;
  }
`;

export default GlobalStyle;
