import styled from "styled-components";

import { Link } from "react-router-dom";

export const Container = styled.header`
  background: #373433;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  h1 {
    color: #fff;
    background-color: #e36600;
    padding: 10px;
    margin-right: 15px;
  }

  @media print {
    display: none;
  }
  @media (max-width: 630px) {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  color: white;
  align-items: center;
  margin: 0 auto;
  ul {
    display: flex;
    list-style: none;
    align-items: center;
    height: 47px;
  }

  li {
    padding: 4px;
    &:hover {
      background-color: #00000047;
    }
  }
`;

export const LinkH = styled(Link)`
  font-size: 13px;
  padding: 10px;
  text-decoration: none;
  margin: 10px;
  color: ${props => (props.ativo ? "#e36600" : "#fff")};
  text-transform: uppercase;
`;
