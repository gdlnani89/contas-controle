import React from "react";

import { Ul } from "./styles";

export const ListaGastos = ({ gastos }) => {
  return (
    <Ul>
      {gastos.map((i, index) => (
        <li key={index}>
          <input className="dia" placeholder="Dia" />
          <p>{i}</p>
          <input className="valor" placeholder="Valor" />
        </li>
      ))}
    </Ul>
  );
};
