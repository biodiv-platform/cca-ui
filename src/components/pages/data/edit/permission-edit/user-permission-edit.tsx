import { Button, Input } from "@chakra-ui/react";
import { SelectAsyncInputField } from "@components/form/select-async";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { axEsUserAutoComplete } from "@services/auth.service";
import { axUpdateParticipationUsers } from "@services/cca.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";

import useTemplateResponseEdit from "../use-template-response-edit";

export default function UserPermissionEditor({ initialUsers, author }) {
  const { t } = useTranslation();
  const { response, setResponse, isEdit, setIsEdit } = useTemplateResponseEdit();

  const onUserQuery = async (q) => {
    const { data } = await axEsUserAutoComplete(q);
    return data.map((tag) => ({
      label: `${tag.name} (${tag.id})`,
      value: tag.id,
      version: tag.version
    }));
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
    <DialogRoot open={isEdit} onOpenChange={handleOnClose}>
      <DialogBackdrop />
      <DialogContent>
        <FormProvider {...hForm}>
          <form onSubmit={hForm.handleSubmit(handleFormSubmit)} className="fade">
            <DialogHeader>{t("form:permission.title")}</DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <Field mb={4}>
                <Field label={t("common:owner")} />
                <Input type="text" disabled={true} value={author.name} />
              </Field>
              <SelectAsyncInputField
                name="allowedUsers"
                label={t("form:contributors_for_document")}
                placeholder={t("form:contributors_for_document")}
                onQuery={onUserQuery}
                multiple={true}
                isCreatable={false}
                isClearable={false}
              />
            </DialogBody>
            <DialogFooter>
              <Button mr={3} onClick={handleOnClose} variant={"subtle"}>
                {t("common:close")}
              </Button>
              <SubmitButton>{t("common:save")}</SubmitButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </DialogRoot>
  );
}
