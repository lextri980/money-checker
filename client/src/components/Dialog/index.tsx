import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { IDialog } from "./type";

export default function Dialog(props: IDialog) {
  const { ...rest } = props;

  const mergedClassName = `dialog-container ${props.cln || ""}`.trim();

  return (
    <Modal className={mergedClassName} {...rest}>
      <ModalContent>
        {!props.hideHeader && <ModalHeader>{props.header}</ModalHeader>}
        <ModalBody className="px-7 dialog-body">{props.children}</ModalBody>
        {!props.hideFooter && <ModalFooter>{props.footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
}
