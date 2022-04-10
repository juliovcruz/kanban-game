import { createGlobalStyle } from "styled-components";
import { base } from "./colors";

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}
body, html {
  background: ${base.background};
  height: 100%;
  body::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
body, input, button {
  font-family: Roboto, sans-serif !important;
  font-size: 14px;
}

ul {
  list-style: none;
}

`;
