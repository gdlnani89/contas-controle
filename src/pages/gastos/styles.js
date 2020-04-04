import styled from "styled-components";

export const H2 = styled.h2`
  text-align: center;
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  @media (max-width: 630px) {
    flex-direction: column;
    input {
      width: 90%;
      margin-bottom: 4px;
    }
    ul {
      width: 90%;
    }
  }
`;

export const Ul = styled.ul`
  width: 80%;
  margin: auto;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 2px;
  }

  p {
    text-align: center;
    margin: 0 4px;
    font-size: 20px;
  }

  .total {
    text-align: right;
    padding: 4px;
    border-bottom: 1px solid black;
  }

  @media (max-width: 630px) {
    width: 90%;
    table {
      font-size: 10px;
    }
  }
`;

export const Extrato = styled.ul`
  width: 80%;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 10px auto;
  align-items: flex-end;
  justify-content: center;

  li input {
    margin-left: 10px;
    margin-bottom: 4px;
  }

  .total {
    font-size: 25px;
  }
  @media (max-width: 630px) {
    width: 90%;
    table {
      font-size: 10px;
    }
    li input {
      width: 100%;
    }
  }
`;
