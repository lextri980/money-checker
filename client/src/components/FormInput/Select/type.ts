import { SelectProps } from "@nextui-org/react";

export interface ISelectProps extends Omit<SelectProps, "children" | "items"> {
  options: { label: string; value: string }[];
}
