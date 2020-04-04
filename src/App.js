import React from "react";
import { BrowserRouter } from "react-router-dom";

import { Global } from "./global/styles";

import Menu from "./components/menu/index";

import Routes from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes />
      <Global />
    </BrowserRouter>
  );
}
