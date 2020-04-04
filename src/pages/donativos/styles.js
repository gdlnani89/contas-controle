import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;

  h4 {
    text-align: center;
  }
`;

export const H2 = styled.h2`
text-align:center;
  @media (max-width: 630px) {
    position: fixed;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  button {
    margin: 10px;
  }
  @media (max-width: 630px) {
    flex-direction: column;
  }

  @media print {
    display: none;
  }
`;

export const Add = styled.button`
  background-color: #30527f;
  border: none;
  padding: 10px 10px;
  color: #fff;
  margin: 10px auto;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  @media (max-width: 630px) {
    width: 80%;
  }
  @media print {
    display: none;
  }
`;

export const Tabela = styled.table`
  border-collapse: collapse;
  margin: auto;
  text-align: center;
  thead {
    font-size: 24px;
  }
  tfoot {
    background: lightgray;
    border: 1px solid black;
    font-size: 25px;
  }
  th {
    padding: 10px;
  }
  @media (max-width: 630px) {
    display: none;
  }
`;
