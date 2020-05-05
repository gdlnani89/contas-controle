import styled from "styled-components";

export const Container = styled.div`
  margin-top: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  width: 100%;
`;

export const Item = styled.p`
  font-size: 30px;
`;

export const Label = styled.label`
  position: relative;
  padding: 20px;
  input {
    display: none;
  }

  span {
    width: 100px;
    height: 40px;
    border-radius: 4px;
    background: #ccc;
    display: block;
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s;
  }

  span:before {
    content: "ñ";
    color: #ccc;
    font-size: 27px;
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    left: 25px;
    bottom: 24px;
    background: white;
  }

  & input:checked + span {
    background: orange;
  }

  & input:checked + span:before {
    left: 82px;
    content: "ok";
    font-size: 27px;
    color: orange;
  }
`;

/* .s2{
  width: 100px;
  height: 40px;
  background: #ccc;
  display: block;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
  border-radius: 20px;
}
.s2:before{
  content: '';
  position: absolute;
  width: 32px;
  height: 32px;
  left: 4px;
  bottom: 4px;
  background: white;
  border-radius: 50%;
}
.s input:checked + .s2{
  background: #03a9f4;
}
.s input:checked + .s2:before{
  left: 64px;
}
 */
