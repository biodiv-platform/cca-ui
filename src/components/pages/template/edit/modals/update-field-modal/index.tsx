import React from "react";

import useTemplate from "../../use-template";
import UpdateFieldForm from "./form";
import { Dialog, Portal } from "@chakra-ui/react";

export default function UpdateFieldModal() {
  const { currentField, clearCurrentField } = useTemplate();

  return (
    <Dialog.Root size="xl" open={currentField} modal={false}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          {currentField && (
            <UpdateFieldForm defaultValues={currentField} onClose={clearCurrentField} />
          )}
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
