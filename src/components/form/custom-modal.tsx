import { Box } from "@chakra-ui/react";
import React from "react";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot
} from "@/components/ui/dialog";

const CustomModal = ({ isOpen, onClose, nakshaImport, geoJSONImport }) => {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent paddingBottom={10} maxW="lg">
        <DialogHeader fontSize={"2xl"} fontWeight={"bold"}>
          Import
        </DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4">
            <Box marginTop="2">{nakshaImport}</Box>
          </Box>

          <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4" marginTop="4">
            <Box marginTop="2">{geoJSONImport}</Box>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default CustomModal;
