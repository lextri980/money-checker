import { InputProps } from "@nextui-org/input";
import React from "react";
import { InputWrapper } from "./style";

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <InputWrapper variant="bordered" {...props} baseRef={ref} />;
  }
);

InputText.displayName = "InputText";
export default InputText;
