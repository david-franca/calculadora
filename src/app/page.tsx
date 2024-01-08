"use client";
import { evaluate } from "mathjs";
import { KeyboardEvent, useCallback, useEffect, useState } from "react";

import { CalculatorButton, CalculatorDisplay } from "@/components";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  Heading,
  Input,
} from "@chakra-ui/react";

interface ButtonProps {
  value: string;
  color?: string;
  onClick?: () => void;
  span?: number;
  disabled?: boolean;
}

export default function Home() {
  const [value, setValue] = useState("0");
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState(false);

  const buttons: ButtonProps[] = [
    { value: "AC", color: "teal", onClick: () => handleSpecialOperator("AC") },
    {
      value: "+/-",
      color: "teal",
      onClick: () => handleSpecialOperator("+/-"),
    },
    { value: "%", color: "teal", onClick: () => handleSpecialOperator("%") },
    { value: "/", color: "teal" },
    { value: "7" },
    { value: "8" },
    { value: "9" },
    { value: "x", color: "teal" },
    { value: "4" },
    { value: "5" },
    { value: "6" },
    { value: "-", color: "teal" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "+", color: "teal" },
    { value: "0", span: 2 },
    { value: "." },
    { value: "=", color: "teal", onClick: () => handleSpecialOperator("=") },
  ];

  const handleDisplay = useCallback(
    (number: string) => {
      value === "0" ? setValue(number) : setValue(`${value}${number}`);
    },
    [value]
  );

  const handleSpecialOperator = useCallback(
    (operator: string) => {
      switch (operator) {
        case "AC":
          setValue("0");
          setError(false);
          break;
        case "+/-":
          value === "0" ? setValue("0") : setValue(`${Number(value) * -1}`);
          break;
        case "%":
          value === "0" ? setValue("0") : setValue(`${Number(value) / 100}`);
          break;
        case "=":
          setEvaluating(true);
          try {
            const parsedValue = value.replace("x", "*");
            setValue(`${evaluate(parsedValue)}`);
          } catch (e) {
            setError(true);
            setValue("0");
          } finally {
            setEvaluating(false);
          }
          break;
      }
    },
    [value]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      const isNumber = !isNaN(Number(key));
      const isOperator = ["+", "-", "*", "/", "%"].includes(key);
      const isEnter = key === "Enter";
      const isBackspace = key === "Backspace";
      const isDelete = key === "Delete";
      const isEscape = key === "Escape";

      if (isNumber) {
        handleDisplay(key);
      } else if (isOperator) {
        handleDisplay(key);
      } else if (isEnter) {
        handleSpecialOperator("=");
      } else if (isBackspace || isDelete || isEscape) {
        handleSpecialOperator("AC");
      }
    },
    [handleDisplay, handleSpecialOperator]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress as any);
    return () => document.removeEventListener("keydown", handleKeyPress as any);
  }, [handleKeyPress, value]);

  return (
    <Flex
      bg="teal"
      h="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading mb={5} color="white">
        Calculadora
      </Heading>
      <Card variant="elevated">
        <CardHeader>
          <CalculatorDisplay
            value={value}
            evaluating={evaluating}
            error={error}
          />
        </CardHeader>
        <CardBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={2}>
            {buttons.map((button) => (
              <CalculatorButton
                key={button.value}
                value={button.value}
                color={button.color}
                onClick={
                  button.onClick
                    ? button.onClick
                    : () => handleDisplay(button.value)
                }
                span={button.span}
                disabled={evaluating}
              />
            ))}
          </Grid>
        </CardBody>
      </Card>
    </Flex>
  );
}
