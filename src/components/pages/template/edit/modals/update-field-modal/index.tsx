import React from "react";

import { DialogBackdrop, DialogRoot } from "@/components/ui/dialog";

import useTemplate from "../../use-template";
import UpdateFieldForm from "./form";

export default function UpdateFieldModal() {
  const { currentField, clearCurrentField } = useTemplate();

  return (
    <DialogRoot open={currentField} onOpenChange={clearCurrentField} size="xl">
      <DialogBackdrop />
      {currentField && <UpdateFieldForm defaultValues={currentField} onClose={clearCurrentField} />}
    </DialogRoot>
  );
}
