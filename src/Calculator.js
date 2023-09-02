import React, { useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";

const DispalyValue = styled.div`
  width: auto;
  max-width: 500px;
  margin: 30px auto;
  padding: 10px 20px;
  text-align: right;
  border: 1px solid black;
  border-radius: 20px;
  font-size: 30px;
`;

const NumberPad = styled.div`
  margin: 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    width: 55px;
    height: 50px;
    font-size: 20px;
    border: 1px solid rgb(186, 186, 186);
    border-radius: 10px;

    &:hover {
      background-color: rgb(150, 150, 150);
    }
  }
`;

const ResultValueBlock = styled.div`
  font-size: 20px;
  color: rgb(150, 150, 150);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InputValueBlock = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "𝝅"];
  const [basicOperations, setBasicOperations] = useState([
    "reset",
    "del",
    "=",
    "+",
    "-",
    "*",
    "/",
    ".",
  ]);

  const numberClickHandler = useCallback(
    (number) => {
      if (input === "0") {
        setInput("");
      }

      if (number === "𝝅") {
        if (input === "0" || input.includes("+", "-", "*", "/", ".")) {
          setInput((prev) => prev + String(Math.PI));
        } else {
          return;
        }
      } else {
        setInput((prev) => prev + String(number));
      }
    },
    [input]
  );

  const operationClickHandler = useCallback(
    (operation) => {
      if (operation === "=") {
        // 계산하기(=) 을 눌렀을 때

        if (result === "") {
          return;
        }

        try {
          const calculatedResult = eval(result + input);
          setInput(String(calculatedResult));
          setResult((prev) => prev + `${input}${operation}`);
        } catch (error) {
          console.log("오류");
        }
      } else if (operation === ".") {
        // 소수점을 눌렀을 때
        if (input === "0") {
          setInput("");
        } else if (input.includes(".")) {
          return;
        }
        setInput((prev) => prev + `${input}${operation}`);
      } else if (operation === "reset") {
        setResult("");
        setInput("0");
      } else if (operation === "del") {
        if (input !== "0") {
          setInput((prev) => prev.slice(0, -1));
        }
      } else {
        //결과값에 = 이 있는 경우 값을 초기화한다.
        if (result.includes("=")) {
          setResult("");
        }
        setResult((prev) => prev + `${input}${operation}`);
        console.log(result);
        setInput("0");
      }
    },
    [input, result]
  );

  const KeyDownHandler = useCallback(
    (event) => {
      const key = event.key;
      if (/[0-9]/.test(key)) {
        numberClickHandler(Number(key));
      } else if (basicOperations.includes(key)) {
        operationClickHandler(key);
      } else if (key === "Enter") {
        operationClickHandler("=");
      } else if (key === "Backspace") {
        operationClickHandler("del");
      } else if (key === "r") {
        operationClickHandler("reset");
      } else if (key === "p") {
        numberClickHandler("𝝅");
      }
    },
    [basicOperations, numberClickHandler, operationClickHandler]
  );

  useEffect(() => {
    window.addEventListener("keydown", KeyDownHandler);
    return () => {
      window.removeEventListener("keydown", KeyDownHandler);
    };
  }, [KeyDownHandler, input, result]);

  return (
    <>
      <DispalyValue>
        <ResultValueBlock>{result}</ResultValueBlock>
        <InputValueBlock>{input || "0"}</InputValueBlock>
      </DispalyValue>
      <div>
        <NumberPad>
          {basicOperations.map((operation, index) => {
            return (
              <button
                key={index}
                onClick={() => operationClickHandler(operation)}
              >
                {operation}
              </button>
            );
          })}
        </NumberPad>
        <NumberPad>
          {numbers.map((number, index) => {
            return (
              <button key={index} onClick={() => numberClickHandler(number)}>
                {number}
              </button>
            );
          })}
        </NumberPad>
      </div>
    </>
  );
};

export default Calculator;
