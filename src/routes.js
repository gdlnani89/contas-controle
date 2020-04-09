import React from "react";

import { Switch, Route } from "react-router-dom";

import Donativos from "./pages/donativos";
import Gastos from "./pages/gastos";
import Inicio from "./pages/inicial";
import Checklist from "./pages/checklist";

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" exact component={Inicio} /> */}
      <Route path="/donativos" component={Donativos} />
      {/* <Route path="/remessas" component={Remessas} /> */}
      <Route path="/checklist" component={Checklist} />
      <Route path="/gastos" component={Gastos} />
    </Switch>
  );
}
