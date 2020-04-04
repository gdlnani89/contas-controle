import styled from "styled-components";

export const Ul = styled.ul`
  li {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 4px auto;
    border-bottom: 1px solid lightgray;
    padding: 2px;
  }

  p {
    text-align: center;
    margin: 0 4px;
    font-size: 20px;
  }

  .dia {
    width: 50px;
    font-size: 20px;
    padding: 4px;
  }

  .valor {
    width: 100px;
    font-size: 20px;
    padding: 4px;
  }
`;
