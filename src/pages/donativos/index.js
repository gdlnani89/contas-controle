import React, { useState, useEffect } from "react";

import { Container, Form, Add, Tabela, UlContainer, LiDonativos } from "./styles";

import { Data, Valor } from "../../global/styles";

import { formata } from "../../utils/helper";

import {MdCancel} from 'react-icons/md'

export default function Donativos() {

  const [dataReuniao, setReuniao] = useState("");
  const [dataDeposito, setDeposito] = useState("");
  const [om, setOm] = useState("");
  const [cong, setCong] = useState("");
  const [reforma, setReforma] = useState("");
  const [lancamento, setLancamento] = useState([]);

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

  useEffect(()=>{
    const lc = localStorage.getItem('donativos');
    if(lc){
      setLancamento(JSON.parse(lc))
    }
  },[])

  useEffect(()=> {
    localStorage.setItem('donativos', JSON.stringify(lancamento));
  }, [lancamento])
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
              console.log(lancamento);
              
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
        <LiDonativos>
            {lancamento.map((i,id)=>(
                <li key={id}>
                  <div className="data">
                    <p>Reuniao: {i.dataReuniao.split('-')[2]+'/'+i.dataReuniao.split('-')[1]}</p>
                    <p>Depósito: {i.dataDeposito.split('-')[2]+'/'+i.dataDeposito.split('-')[1]}</p>
                  </div>
                  <div className="donativos">
                    <div>
                      <p>O.M:</p>
                      <p>{formata(parseFloat(i.om))}</p>
                    </div>
                    <div>
                      <p>Cong.:</p>
                      <p>{formata(parseFloat(i.cong))}</p>
                    </div>
                    <div>
                      <p>R.Betel:</p>
                      <p>{formata(parseFloat(i.reforma))}</p>
                    </div>
                  </div>
                  <button>
                    <MdCancel size="25px"/>
                  </button>
                </li>
            ))}
        </LiDonativos>

        <UlContainer>
          <ul>
            <li>
              Obra Mundial: {formata(totalOm + totalReforma)} 
            </li>
            <li>
              Congregação: {formata(totalCong)}
            </li>
          </ul>
        </UlContainer>
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
