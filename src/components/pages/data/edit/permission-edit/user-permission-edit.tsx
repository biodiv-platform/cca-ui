import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { SelectAsyncInputField } from "@components/form/select-async";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUserSearch } from "@services/auth.service";
import { axUpdateParticipationUsers } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import useTemplateResponseEdit from "../use-template-response-edit";

export default function UserPermissionEditor({ initialUsers, author }) {
  const { t } = useTranslation();
  const { response, setResponse, isEdit, setIsEdit } = useTemplateResponseEdit();

  const onUserQuery = async (q) => {
    const { data } = await axUserSearch(q);
    return data.map((tag) => ({ label: tag.name, value: tag.id, version: tag.version }));
  };

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(Yup.object().shape({ userIds: Yup.array().nullable() })),
    defaultValues: { allowedUsers: initialUsers }
  });

  const handleFormSubmit = async (values) => {
    const allowedUsers = values.allowedUsers.map((o) => o.value.toString());
    setResponse({ ...response, allowedUsers });
    const { success } = await axUpdateParticipationUsers({ id: response.id, allowedUsers });
    if (success) {
      notification(t("form:saved.success"), NotificationType.Success);
    } else {
      notification(t("form:saved.error"));
    }
    handleOnClose();
  };

  const handleOnClose = () => setIsEdit(false);

  return (
    <Modal isOpen={isEdit} onClose={handleOnClose}>
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleFormSubmit)} className="fade">
            <ModalHeader>{t("form:permission.title")}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={4}>
                <FormLabel>{t("common:owner")}</FormLabel>
                <Input type="text" isDisabled={true} value={author.name} />
              </FormControl>
              <SelectAsyncInputField
                name="allowedUsers"
                label={t("form:contributors_for_document")}
                placeholder={t("form:contributors_for_document")}
                onQuery={onUserQuery}
                multiple={true}
                isCreatable={false}
                isClearable={false}
              />
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={handleOnClose}>
                {t("common:close")}
              </Button>
              <SubmitButton>{t("common:save")}</SubmitButton>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
