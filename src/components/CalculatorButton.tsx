import { Button } from "@chakra-ui/react";
import React from "react";

interface CalculatorButtonProps {
  value: string;
  color?: string;
  onClick?: () => void;
  span?: number;
  disabled?: boolean;
}

export function CalculatorButton({
  value,
  color,
  onClick,
  span = 1,
  disabled,
}: CalculatorButtonProps) {
  return (
    <Button
      colorScheme={color}
      onClick={onClick}
      gridColumn={`span ${span}`}
      isDisabled={disabled}
    >
      {value}
    </Button>
  );
}
