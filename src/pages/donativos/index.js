import React, { useState, useEffect } from "react";

import { Container, Form, Add, Tabela, UlContainer, LiDonativos } from "./styles";

import { Data, Valor } from "../../global/styles";

import { formata } from "../../utils/helper";

import {MdClose} from 'react-icons/md'

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

  function excluirLancamento(donativoData){
    const nvLista = lancamento.filter(p => p.dataReuniao !== donativoData)
    setLancamento(nvLista)
  }
  return (
    <>
      <Form>
        <label htmlFor="reuniao">Reunião</label>
        <Data
          id="reuniao"
          type="date"
          value={dataReuniao}
          onChange={e => setReuniao(e.target.value)}
        />
        <label htmlFor="deposito">Deposito</label>
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
                  <button onClick={() => excluirLancamento(i.dataReuniao)}>
                    <MdClose size="25px" color="tomato"/>
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
            <li>
              Total: {formata(totalDeposito)}
            </li>
          </ul>
        </UlContainer>
      </Container>
    </>
  );
}

