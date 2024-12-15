import { DateRangePickerProps } from "@nextui-org/react";
import React from "react";
import { InputDateRangeContainer } from "./style";

const InputDateRange = React.forwardRef<HTMLInputElement, DateRangePickerProps>(
  (props, ref) => {
    return (
      <InputDateRangeContainer
        {...props}
        aria-label="date-range"
        radius="sm"
        baseRef={ref}
      />
    );
  }
);

InputDateRange.displayName = "InputDateRange";
export default InputDateRange;
