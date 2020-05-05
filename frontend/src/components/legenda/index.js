import React from "react";

import { Leg, Ano, Mes } from "./styles";

export function Legenda({ mesLista, mesAtual, ano, mudaAno, mudaMes }) {
  return (
    <Leg>
      <Ano type="text" value={ano} onChange={mudaAno} />
      <Mes onChange={mudaMes} value={mesAtual}>
        <option>{mesAtual}</option>
        {mesLista.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </Mes>
    </Leg>
  );
}
