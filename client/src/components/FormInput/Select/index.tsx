import { SelectItem } from "@nextui-org/react";
import { SelectContainer } from "./style";
import { ISelectProps } from "./type";
import React from "react";

const Select = React.forwardRef<HTMLInputElement, ISelectProps>(
  (props, ref) => {
    const { ...rest } = props;
    return (
      <SelectContainer
        items={props.options}
        baseRef={ref}
        aria-label="Select"
        {...rest}
      >
        {(option: { label: string; value: string | number }) => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        )}
      </SelectContainer>
    );
  }
);

Select.displayName = "Select";
export default Select;
