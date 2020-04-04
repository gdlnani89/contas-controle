import React, { useState } from "react";

import { Legenda } from "../../components/legenda";

import { Container, Form, Add, Tabela, H2 } from "./styles";

import { Data, Dep, Valor } from "../../global/styles";

import { formata } from "../../utils/helper";

export default function Donativos() {

  const [dataReuniao, setReuniao] = useState("");
  const [dataDeposito, setDeposito] = useState("");
  const [om, setOm] = useState("");
  const [cong, setCong] = useState("");
  const [reforma, setReforma] = useState("");
  const [lancamento, setLancamento] = useState([]);
  const [periodo, setPeriodo] = useState([]);
  //const periodo = [{ mes_ano : '2020', {}}]

  // useEffect(() => {}, [lancamento]);

  const totalOm = lancamento.reduce(
    (a, b) => a + parseFloat(b.om.replace(",", ".")),
    0
  );

  const totalCong = lancamento.reduce(
    (a, b) => a + parseFloat(b.cong.replace(",", ".")),
    0
  );

  const totalReforma = lancamento.reduce(
    (a, b) => a + parseFloat(b.reforma.replace(",", ".")),
    0
  );

  const totalDeposito = lancamento
    .map(i => parseFloat(i.om) + parseFloat(i.cong) + parseFloat(i.reforma))
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Form>
        <label>Reunião</label>
        <Data
          id="reuniao"
          type="date"
          value={dataReuniao}
          onChange={e => setReuniao(e.target.value)}
        />
        <label>Deposito</label>
        <Data
          id="deposito"
          type="date"
          value={dataDeposito}
          onChange={e => setDeposito(e.target.value)}
        />
        <Valor
          value={om}
          type="number"
          onChange={e => setOm(e.target.value)}
          placeholder="Obra mundial"
        />
        <Valor
          value={cong}
          type="number"
          onChange={e => setCong(e.target.value)}
          placeholder="Congregação"
        />
        <Valor
          value={reforma}
          type="number"
          onChange={e => {
            setReforma(e.target.value);
          }}
          placeholder="Reforma Betel"
        />
        <Add
          onClick={e => {
            e.preventDefault();
            if ( dataReuniao && dataDeposito && om && cong && reforma) {
              setLancamento([
                ...lancamento,
                { dataReuniao, dataDeposito, om, cong, reforma }
              ]);
              setReuniao("");
              setDeposito("");
              setOm("");
              setCong("");
              setReforma("");
              document.getElementById("reuniao").focus();
            } else {
              alert("preencha todos os campos");
            }
          }}
        >
          Adicionar
        </Add>
      </Form>
      <Container>
        <Tabela>
          <thead>
            <tr key={"cabecalho"}>
              <th>Dia</th>
              <th>Depositado</th>
              <th>Obra Mundial</th>
              <th>Congregação</th>
              <th>Reforma Betel</th>
              <th>Depósito</th>
            </tr>
          </thead>
          <tbody>
            {lancamento.map((i, id) => (
              <tr key={id}>
                <td>{i.dataReuniao.split('-')[2]+'/'+i.dataReuniao.split('-')[1]}</td>
                <td>{i.dataDeposito.split('-')[2]+'/'+i.dataDeposito.split('-')[1]}</td>
                <td>{formata(parseFloat(i.om))}</td>
                <td>{formata(parseFloat(i.cong))}</td>
                <td>{formata(parseFloat(i.reforma))}</td>
                <td>
                  {formata(
                    parseFloat(i.om.replace(",", ".")) +
                      parseFloat(i.cong.replace(",", ".")) +
                      parseFloat(i.reforma.replace(",", "."))
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>
                {/* OM */}
                {formata(totalOm)}
              </td>
              <td>
                {/* congregação */}
                {formata(totalCong)}
              </td>
              <td>
                {/* reforma betel */}
                {formata(totalReforma)}
              </td>
              <td>
                {/* depositos */}
                {formata(totalDeposito)}
              </td>
            </tr>
          </tfoot>
        </Tabela>
        <ul>
            {lancamento.map((i,id)=>(
                <li>
                    <p>Reuniao: {i.dataReuniao.split('-')[2]+'/'+i.dataReuniao.split('-')[1]}</p>
                    <p>Depósito: {i.dataDeposito.split('-')[2]+'/'+i.dataDeposito.split('-')[1]}</p>
                    <p>O.M:{formata(parseFloat(i.om))}</p>
                    <p>Cong.:{formata(parseFloat(i.cong))}</p>
                    <p>R.Betel:{formata(parseFloat(i.reforma))}</p>
                </li>
            ))}
        </ul>
        <H2>Remessa {formata(totalOm + totalReforma)} </H2>
        {/* <Add
          onClick={e => {
            e.preventDefault();
            if (ano && mes) {
              setPeriodo([
                ...periodo,
                {
                  ano,
                  mes,
                  lancamento
                }
              ]);
            } else {
              alert("Ano e mês devem estar preenchido");
            }
            console.log(periodo);
          }}
        >
          Salvar
        </Add> */}
      </Container>
    </>
  );
}
