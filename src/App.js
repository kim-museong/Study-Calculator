import React from "react";
import Calculator from "./Calculator";
import { styled } from "styled-components";

const TitleBlock = styled.h1`
  text-align: center;
  margin: 5rem auto;
`;

function App() {
  return (
    <div>
      <TitleBlock>간단한 계산기 만들기</TitleBlock>
      <Calculator />
    </div>
  );
}

export default App;
