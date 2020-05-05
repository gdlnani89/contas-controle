import React, { useState } from "react";

import Radiolist from "../../components/radiolist";
import { Legenda } from "../../components/legenda";
import { Container } from "./styles";
import { mesArray, data } from "../../utils/data";

export default function Checklist() {
  const [ano, setAno] = useState(data.getFullYear());
  const [mes, setMes] = useState("");
  return (
    <Container>
      <Legenda
        ano={ano}
        mesLista={mesArray}
        mesAtual={mes}
        mudaMes={e => setMes(e.target.value)}
        mudaAno={e => setAno(e.target.value)}
      />
      <Radiolist nome={"S-26"} />
      <Radiolist nome={"S-30"} />
      <Radiolist nome={"Cartas de agradecimento"} />
      <Radiolist nome={"Extrato da conta banco"} />
      <Radiolist nome={"Extrato da conta JW"} />
      <Radiolist nome={"To-62(OM)"} />
      <Radiolist nome={"Transação JW(OM)"} />
      <Radiolist nome={"Comp. Banco(OM)"} />
      <Radiolist nome={"To-62(Veículos)"} />
      <Radiolist nome={"Transação JW(Veículos)"} />
      <Radiolist nome={"Comp. Banco(Veículos)"} />
      <Radiolist nome={"Recibos"} />
      <Radiolist nome={"Recibo Rendimento"} />
      <Radiolist nome={"Água"} />
      <Radiolist nome={"Luz"} />
      <Radiolist nome={"Telefone"} />
      <Radiolist nome={"Associação Jurídica"} />
      <Radiolist nome={"Tarifa conta"} />
      <Radiolist nome={"Desp. Capão do Cipó"} />
    </Container>
  );
}
