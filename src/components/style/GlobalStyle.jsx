import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'SpoqaHanSansNeo-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

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
    --font--bold: 700;
    --font--semibold: 500;
    --font-regular: 400;
  }

  :root {
    font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
    -ms-overflow-style: none; /* IE scroll disable*/
    scrollbar-width: none;  /* 파이어폭스 scroll disable*/
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 scroll disable*/
    }
  }

  li{
    list-style:none;
  }

  button {
    font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
    cursor: pointer;
    padding: 0;
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  a {
    text-decoration: none;
  }

  input {
    border: 0;
    font-family: 'SpoqaHanSansNeo-Regular', sans-serif;
    resize: none;
  }

  .a11y-hidden {
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      width: 1px;
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
  }

  #root{
    width: 390px;
    height: 100vh;
    margin: 0 auto;
    background-color: #fff;
  }
`;

export default GlobalStyle;
