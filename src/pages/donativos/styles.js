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

export const UlContainer = styled.div`
position: fixed;
bottom: 0;
width: 100%;
text-align:center;
margin-bottom: 10px;
ul{
  list-style: none;
  background: orange;
  margin: auto;
  width: 50%;
  padding: 10px;
  border-radius: 8px;
}
  @media (max-width: 630px) {
    margin-bottom: 45px;
    ul{
    font-size: 20px;
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

export const LiDonativos = styled.ul`
display: none;
  @media (max-width: 630px){

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    li{
      display: flex;
      align-items: center;
      width: 90%;
      background: #888888;
      border-radius: 4px;
      margin-bottom: 10px;
      position: relative;

      &:last-child{
      margin-bottom: 120px;
      }
      button{
        border: 0;
        position: absolute;
        background: transparent;
        right: -10px;
      }
    }
    .data{
      flex: 1;
      text-align: center;
      border-radius: 4px 0 0 4px;
      background: #373433;
      color: white;
    }
    .data p{
      padding:5px 10px;
    }
    .donativos{
      flex: 3;
      border-radius: 0 4px 4px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .donativos div{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;