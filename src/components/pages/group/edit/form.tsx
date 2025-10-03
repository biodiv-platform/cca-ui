import { Box, SimpleGrid } from "@chakra-ui/react";
import { useLocalRouter } from "@components/@core/local-link";
import { CheckboxField } from "@components/form/checkbox";
import { RichTextareaField } from "@components/form/rich-textarea";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { UserGroupEditData } from "@interfaces/userGroup";
import { axUserGroupUpdate } from "@services/usergroup.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import ImageUploaderField from "../common/image-uploader-field";
import { STATIC_GROUP_PAYLOAD } from "../common/static";

interface IuserGroupEditProps {
  groupInfo: UserGroupEditData;
  userGroupId;
}

export default function UserGroupEditForm({ groupInfo, userGroupId }: IuserGroupEditProps) {
  const { t } = useTranslation();
  const router = useLocalRouter();
  const { languageId } = useGlobalState();

  const { name, description, icon, habitatId, speciesGroupId, allowUserToJoin } = groupInfo;

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required(),
        speciesGroupId: Yup.array().required(),
        habitatId: Yup.array().required()
      })
    ),
    defaultValues: {
      name,
      description,
      icon,
      habitatId,
      speciesGroupId,
      allowUserToJoin
    }
  });

  const handleFormSubmit = async (values) => {
    const { spacialCoverage, ...otherValues } = values;

    const payload = {
      ...STATIC_GROUP_PAYLOAD,
      ...otherValues,
      languageId: values.languageId || languageId
    };

    const { success } = await axUserGroupUpdate(payload, userGroupId);
    if (success) {
      notification(t("group:edit.success"), NotificationType.Success);
      router.push(`/`, true, {}, true);
    } else {
      notification(t("group:edit.error"));
    }
  };

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleFormSubmit)} className="fadeInUp">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ md: 4 }}>
          <Box gridColumn="1/4">
            <TextBoxField name="name" isRequired={true} label={t("group:name")} />
            <RichTextareaField name="description" label={t("form:description")} />
          </Box>
          <ImageUploaderField label="Logo" name="icon" />
        </SimpleGrid>
        <CheckboxField name="allowUserToJoin" label={t("group:join_without_invitation")} />
        <SubmitButton mb={8}>{t("group:update")}</SubmitButton>
      </form>
    </FormProvider>
  );
}
