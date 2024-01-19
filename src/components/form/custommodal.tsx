import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
  } from "@chakra-ui/react";
  import React from "react";

  const CustomModal = ({ isOpen, onClose, nakshaImport, geoJSONImport }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent paddingBottom={10} maxW="lg">
          <ModalHeader>Import</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4">
              <Box marginTop="2">{nakshaImport}</Box>
            </Box>
  
            <Box border="1px" borderColor="gray.200" borderRadius="md" padding="4" marginTop="4">
              <Box marginTop="2">{geoJSONImport}</Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export default CustomModal;