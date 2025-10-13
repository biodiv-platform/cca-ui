import React, { useState, useEffect } from "react";
import useTemplate from "../../use-template";
import UpdateFieldForm from "./form";
import { Dialog, Portal } from "@chakra-ui/react";

export default function UpdateFieldModal() {
  const { currentField, clearCurrentField } = useTemplate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(currentField));
  }, [currentField]);

  const handleOpenChange = (e) => {
    setOpen(e.open);
    if (!e.open) {
      clearCurrentField();
    }
  };

  return (
    <Dialog.Root size="xl" open={open} onOpenChange={handleOpenChange} lazyMount>
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
