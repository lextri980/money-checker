import InputCheckbox from "./InputCheckbox";
import InputDateRange from "./InputDateRange";
import InputPassword from "./InputPassword";
import InputText from "./InputText";
import Select from "./Select";

export const InputType = {
  InputText: "text",
  InputPassword: "password",
  InputNumber: "number",
  InputRadio: "radio",
  InputCheckbox: "checkbox",
  InputSwitch: "switch",
  InputSelect: "select",
  InputTextArea: "textarea",
  InputDate: "date",
  InputDateRange: "date-range",
};

export const InputComponent = {
  [InputType.InputText]: {
    Component: InputText,
  },
  [InputType.InputCheckbox]: {
    Component: InputCheckbox,
  },
  [InputType.InputPassword]: {
    Component: InputPassword,
  },
  [InputType.InputDateRange]: {
    Component: InputDateRange,
  },
  [InputType.InputSelect]: {
    Component: Select,
  },
};
