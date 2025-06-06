import { Box } from "@chakra-ui/react";
import { SubmitButton } from "@components/form/submit-button";
import { SwitchField } from "@components/form/switch";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@icons/check";
import { axUpdateNotifications } from "@services/user.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { UserEditPageComponentProps } from "..";

export default function NotificationsTab({ user }: UserEditPageComponentProps) {
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        sendNotification: Yup.boolean().required(), // Email
        hideEmial: Yup.boolean().required(),
        identificationMail: Yup.boolean().required()
      })
    ),
    defaultValues: {
      sendNotification: user.sendNotification,
      hideEmial: user.hideEmial,
      identificationMail: user.identificationMail
    }
  });

  const handleOnUpdate = async (payload) => {
    const { success } = await axUpdateNotifications({
      id: user.id,
      sendPushNotification: user.sendPushNotification,
      sendDigest: user.sendDigest,
      ...payload
    });
    if (success) {
      notification(t("user:updated"), NotificationType.Success);
    } else {
      notification(t("user:update_error"));
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnUpdate)}>
        <Box p={4}>
          <SwitchField name="sendNotification" label={t("user:send_email")} />
          <SwitchField name="identificationMail" label={t("user:identification_mail")} />
          <SwitchField name="hideEmial" label={t("user:hide_email")} />
          <SubmitButton leftIcon={<CheckIcon />}>{t("common:save")}</SubmitButton>
        </Box>
      </form>
    </FormProvider>
  );
}
