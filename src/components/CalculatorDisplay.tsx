import { Input } from "@chakra-ui/react";
import React from "react";

interface CalculatorDisplayProps {
  value: string;
  evaluating: boolean;
  error: boolean;
}

export function CalculatorDisplay({
  value,
  evaluating,
  error,
}: CalculatorDisplayProps) {
  return (
    <Input
      value={evaluating ? "Calculando..." : value}
      textAlign="end"
      isReadOnly
      variant={error ? "outline" : "filled"}
      focusBorderColor={error ? "red.400" : "teal.500"}
    />
  );
}
