import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  @media (max-width: 630px){
    border-top: 1px solid #3734334f;
    padding-top: 30px;
    margin-top: -38px;
  }

  h4 {
    text-align: center;
  }
`;

export const UlContainer = styled.div`
position: fixed;
bottom: 0;
width: 100%;
text-align:center;
margin-bottom: 10px;

ul{
  list-style: none;
  background: #ffcc6f;
  margin: auto;
  width: 35%;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0 4px -2px black;
}
  @media (max-width: 630px) {
    margin-bottom: 45px;
    ul{
    width: 100%;
    padding: 10px;
    border-radius: 0;
    }
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
    box-shadow: 0 0 2px 0px #373433;
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
    font-size: 20px;
  }
  tfoot {
    background: lightgray;
    border: 1px solid black;
    font-size: 20px;
  }
  th {
    padding: 0 10px;
  }
  @media (max-width: 630px) {
    display: none;
  }
`;

export const LiDonativos = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li{
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 50%;
      background: #888888;
      border-radius: 4px;
      margin-bottom: 10px;
      position: relative;
      box-shadow: 0 0 5px black;
      &:last-child{
      margin-bottom: 120px;
      }
      button{
        border: 0;
        position: absolute;
        background: transparent;
        right: 2px;
        cursor: pointer;
        outline: none;
      }
    }
    .data{
      display: flex;
      width: 100%;
      text-align: center;
      border-radius: 4px;
      background: #373433;
      color: white;
    }
    .data p{
      padding:5px 10px;
    }
    .donativos{
      width: 100%;
      padding: 5px;
      border-radius: 0 4px 4px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .donativos div{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .donativos div p:nth-child(2){
      font-weight: bold;
    }
    /* @media (max-width: 630px){
      .donativos div{
        flex-direction: row;
      }
    } */
`;