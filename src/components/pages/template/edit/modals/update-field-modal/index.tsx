import { Modal, ModalOverlay } from "@chakra-ui/react";
import React from "react";

import useTemplate from "../../use-template";
import UpdateFieldForm from "./form";

export default function UpdateFieldModal() {
  const { currentField, clearCurrentField } = useTemplate();

  return (
    <Modal isOpen={currentField} onClose={clearCurrentField} size="5xl">
      <ModalOverlay />
      {currentField && <UpdateFieldForm defaultValues={currentField} onClose={clearCurrentField} />}
    </Modal>
  );
}
