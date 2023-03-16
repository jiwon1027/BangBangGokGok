import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider as MThemeProvider } from "@mui/material/styles";
import { mtheme } from "@/styles/theme";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "styled-normalize";
import { theme } from "@/styles/theme";
import { RecoilRoot } from "recoil";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const GlobalStyle = createGlobalStyle`
  ${normalize}
  html{
    font-size: 62.5%; // percent of the font size of your browser // 1rem = 10px
    box-sizing: border-box;
    background-color: #3E2133;
    color: white;
    overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }
  body{
    margin: 0;
  } 
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <MThemeProvider theme={mtheme}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </MThemeProvider>
  </ThemeProvider>
);
