import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, #root {
    background-color: #f8f8f7;
    font-family: WTMannaSans,Arial,"Arial Unicode MS",sans-serif;
  }

`;

export const FieldSet = styled.fieldset`
  border: 1px solid lightgray;
  width: 90%;
  border-radius: 4px;
  margin: auto;
  display: flex;
  justify-content: center;

  table {
    width: 90%;
  }

  table th {
    padding: 0 10px;
  }

  @media (max-width: 630px) {
    table {
      font-size: 10px;
    }
  }
`;

export const DiaG = styled.input`
  width: 56px;
  font-size: 20px;
  padding: 4px;
  margin-right: 4px;
`;
export const ValorG = styled(DiaG)`
  width: 100px;
`;

export const Data = styled.input`
  height: 42px;
  font-size: 20px;
  padding: 4px;
  margin-right: 4px;
  @media (max-width: 630px) {
    width: 80%;
    margin-bottom: 4px;
  }
`;
export const Dep = styled(Data)`
  width: 140px;
`;
export const Nome = styled(Data)`
  width: 300px;
`;

export const Valor = styled(Data)`
  width: 100px;
`;
export const Add = styled.button`
  background-color: #30527f;
  border: none;
  padding: 5px 10px;
  color: #fff;
`;
