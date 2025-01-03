import { ModalProps } from "@nextui-org/react";

export interface IDialog extends ModalProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  cln?: string;
}

