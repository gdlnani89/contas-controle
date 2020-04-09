import React from "react";

import { Container, Nav, LinkH } from "./styles";

export default function Header() {
  return (
    <Container>
      <Nav>
        <ul>
          <li>
            <LinkH to="/donativos">Donativos</LinkH>
          </li>
          <li>
            <LinkH to="/gastos">Gastos</LinkH>
          </li>
          {/* <li>
            <LinkH to="/remessas">Remessas</LinkH>
          </li> */}
          <li>
            <LinkH to="/checklist">checklist</LinkH>
          </li>
        </ul>
      </Nav>
    </Container>
  );
}
