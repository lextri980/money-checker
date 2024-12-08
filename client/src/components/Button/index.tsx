"use client";
import { ButtonProps } from "@nextui-org/react";
import { ButtonContainer } from "./style";

export default function Button(props: ButtonProps) {
  const { ...rest } = props;
  return (
    <ButtonContainer
      onClick={props.onClick}
      color={props.color}
      radius={props.radius || "sm"}
      {...rest}
    >
      {props.children}
    </ButtonContainer>
  );
}
