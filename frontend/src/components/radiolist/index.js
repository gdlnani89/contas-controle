import React from "react";

import { Container, Item, Label } from "./styles";

export default function Radiolist({ nome }) {
  return (
    <Container>
      <Item>{nome}</Item>
      <Label>
        <input type="checkbox" />
        <span />
      </Label>
    </Container>
  );
}
