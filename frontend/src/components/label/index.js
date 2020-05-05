import React from "react";

function Label({ nome, valor, setar }) {
  return (
    <label>
      {nome}
      <Valor type="number" value={valor} onChange={setar} />
    </label>
  );
}
