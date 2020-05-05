import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Global } from "./global/styles";

import Menu from "./components/menu/index";

import Routes from "./routes";

export default function App() {
  return (
    <Router>
      <Menu />
      <Routes />
      <Global />
    </Router>
  );
}
