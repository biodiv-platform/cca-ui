import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import DeleteIcon from "@icons/delete";
import notification, { NotificationType } from "@utils/notification";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import SimpleActionButton from "./simple";

export default function DeleteActionButton({
  observationId,
  deleteFunc,
  title,
  deleteGnfinderName = false,
  description,
  deleted,
  refreshFunc = () => {
    return null;
  }
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleOnDelete = async () => {
    const { success } = await deleteFunc(observationId);
    if (success) {
      notification(deleted, NotificationType.Success);
      if (deleteGnfinderName) {
        refreshFunc();
      }
      onClose();
      if (!deleteGnfinderName) {
        router.push("/");
      }
    }
  };

  return (
    <>
      <SimpleActionButton onClick={onOpen} icon={<DeleteIcon />} title={title} colorScheme="red" />
      <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              🗑️ {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {t("common:cancel")}
              </Button>
              <Button colorScheme="red" onClick={handleOnDelete} ml={3}>
                {t("common:delete")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
