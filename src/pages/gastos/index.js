import React, { useState, useEffect } from "react";

import { formata2 } from "../../utils/helper";

import { Add, DiaG, Nome, ValorG } from "../../global/styles";
import { Legenda } from "../../components/legenda";
import { mesArray, data } from "../../utils/data";

import { H2, Form, Ul, Extrato } from "./styles";

export default function Gastos() {
  const [ano, setAno] = useState(data.getFullYear());
  const [mes, setMes] = useState("");
  /* const gastosFixos = [
    "Associaçao juridica",
    "Construção Mundial",
    "Programa de ajuda Veículos"
  ]; */

  // const [gasto, setGasto] = useState("");

  const [agua, setAgua] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [luz, setLuz] = useState("");
  const [assJur, setAss] = useState("");

  const [vSoma, setSoma] = useState("");

  const [gDia, setDia] = useState("");
  const [gNome, setNome] = useState("");
  const [gValor, setValor] = useState("");
  const [gSoma, setGSoma] = useState("0");
  const [gOutros, setOutros] = useState([]);

  const [total, setTotal] = useState("");

  const [saldoIni, setSaldoini] = useState("");
  const [donativos, setDonativos] = useState("");
  const [rendimento, setRend] = useState("");
  const [remessa, setRemessa] = useState("");
  const [saldoFinal, setSaldofinal] = useState("0");

  useEffect(() => {
    const aguaE = parseFloat(agua.replace(",", "."))
      ? parseFloat(agua.replace(",", "."))
      : 0;
    const telE = parseFloat(telefone.replace(",", "."))
      ? parseFloat(telefone.replace(",", "."))
      : 0;
    const tarE = parseFloat(tarifa.replace(",", "."))
      ? parseFloat(tarifa.replace(",", "."))
      : 0;
    const luzE = parseFloat(luz.replace(",", "."))
      ? parseFloat(luz.replace(",", "."))
      : 0;
    const assE = parseFloat(assJur.replace(",", "."))
      ? parseFloat(assJur.replace(",", "."))
      : 0;
    const tl = aguaE + telE + tarE + luzE + assE;
    setSoma(tl);
  }, [agua, telefone, tarifa, luz, assJur]);

  useEffect(() => {
    const gTotal = gOutros
      .map(i => parseFloat(i.valor.replace(",", ".")))
      .reduce((a, b) => a + b, 0);
    const tl = gTotal;
    setGSoma(tl);
  }, [gOutros]);

  useEffect(() => {
    setTotal(vSoma + gSoma);
  }, [vSoma, gSoma]);

  useEffect(() => {
    const si = parseFloat(saldoIni.replace(",", "."))
      ? parseFloat(saldoIni.replace(",", "."))
      : 0;
    const don = parseFloat(donativos.replace(",", "."))
      ? parseFloat(donativos.replace(",", "."))
      : 0;
    const rend = parseFloat(rendimento.replace(",", "."))
      ? parseFloat(rendimento.replace(",", "."))
      : 0;
    const rem = parseFloat(remessa.replace(",", "."))
      ? parseFloat(remessa.replace(",", "."))
      : 0;
    const tl = si + don + rend - (rem + total);
    setSaldofinal(tl);
  }, [total, saldoIni, donativos, rendimento, remessa]);
  return (
    <>
      <Legenda
        ano={ano}
        mesLista={mesArray}
        mesAtual={mes}
        mudaMes={e => setMes(e.target.value)}
        mudaAno={e => setAno(e.target.value)}
      />
      <H2>Gastos Fixos</H2>
      <Ul>
        <li>
          <DiaG type="number" className="dia" placeholder="Dia" />
          <p>Conta de Água</p>
          <ValorG
            type="number"
            value={agua}
            onChange={e => setAgua(e.target.value)}
            className="valor"
            placeholder="Valor"
          />
        </li>
        <li>
          <DiaG type="number" className="dia" placeholder="Dia" />
          <p>Telefone</p>
          <ValorG
            type="number"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            className="valor"
            placeholder="Valor"
          />
        </li>
        <li>
          <DiaG type="number" className="dia" placeholder="Dia" />
          <p>Tarifa</p>
          <ValorG
            type="number"
            value={tarifa}
            onChange={e => setTarifa(e.target.value)}
            className="valor"
            placeholder="Valor"
          />
        </li>
        <li>
          <DiaG type="number" className="dia" placeholder="Dia" />
          <p>Luz</p>
          <ValorG
            type="number"
            value={luz}
            onChange={e => setLuz(e.target.value)}
            className="valor"
            placeholder="Valor"
          />
        </li>
        <li>
          <DiaG type="number" className="dia" placeholder="Dia" />
          <p>Associação Jurídica</p>
          <ValorG
            type="number"
            value={assJur}
            onChange={e => setAss(e.target.value)}
            className="valor"
            placeholder="Valor"
          />
        </li>
        <p className="total">Total R$ {formata2(vSoma)}</p>
      </Ul>
      <H2>Outros gastos</H2>
      <Form>
        <DiaG
          value={gDia}
          type="number"
          onChange={e => setDia(e.target.value)}
          placeholder="Dia"
        />
        <Nome
          value={gNome}
          onChange={e => setNome(e.target.value)}
          placeholder="Nome"
        />
        <ValorG
          value={gValor}
          type="number"
          onChange={e => setValor(e.target.value)}
          className="valor"
          placeholder="Valor"
        />
        <Add
          onClick={() => {
            setOutros([...gOutros, { dia: gDia, nome: gNome, valor: gValor }]);
            setDia("");
            setNome("");
            setValor("");
          }}
        >
          Adiciona
        </Add>
      </Form>
      <Ul>
        {gOutros.map((v, i) => (
          <li key={i}>
            <p>{v.dia}</p>
            <p>{v.nome}</p>
            <p>{formata2(v.valor)}</p>
          </li>
        ))}
        <p className="total">Total R$ {formata2(gSoma)}</p>
      </Ul>
      <H2>Extrato</H2>
      <Extrato>
        <li>
          <Label
            valor={saldoIni}
            setar={e => setSaldoini(e.target.value)}
            nome={"Saldo inicial"}
          />
        </li>
        <li>
          <Label
            valor={donativos}
            setar={e => setDonativos(e.target.value)}
            nome={"Entradas(Donativos)"}
          />
        </li>
        <li>
          <Label
            valor={rendimento}
            setar={e => setRend(e.target.value)}
            nome={"Entradas(Rendimentos)"}
          />
        </li>
        <li>
          <Label
            valor={remessa}
            setar={e => setRemessa(e.target.value)}
            nome={"Saída(Remessa)"}
          />
        </li>
        <li>
          <p className="gasto">Saída(Gastos) R$ {formata2(total)}</p>
        </li>
        <li>
          <p className="total">Saldo final R$ {formata2(saldoFinal)}</p>
        </li>
      </Extrato>
    </>
  );
}

function Label({ nome, valor, setar }) {
  return (
    <label>
      {nome}
      <ValorG type="number" value={valor} onChange={setar} />
    </label>
  );
}
