import { Box, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useLocalRouter } from "@components/@core/local-link";
import { SubmitButton } from "@components/form/submit-button";
import useGlobalState from "@hooks/use-global-state";
import CheckIcon from "@icons/check";
import { axBulkRemoveGroupMembers } from "@services/usergroup.service";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot
} from "@/components/ui/dialog";

import useUserList from "../../common/use-user-filter";

export default function BulkMapperModal() {
  const { t } = useTranslation();
  const { onClose, isOpen, bulkUserIds, selectAll, unselectedUserIds, filter } = useUserList();

  const { currentGroup } = useGlobalState();

  const router = useLocalRouter();

  const projectForm = useForm<any>({});

  const [isBulkRemove, setIsBulkRemove] = useState(false);

  const handleFormSubmit = async () => {
    const params = {
      ...filter,
      selectAll: selectAll,
      unSelectedIds: unselectedUserIds?.toString(),
      userIds: bulkUserIds?.toString() || "",
      userGroupId: currentGroup?.id?.toString() || "",
      isBulkRemove: isBulkRemove
    };

    console.warn(params);
    const { success } = await axBulkRemoveGroupMembers(params);
    if (success) {
      notification(t("common:bulk_action.success"), NotificationType.Success);
    } else {
      notification(t("common:bulk_action.failure"));
    }
    router.push("/user/list", true, { ...filter }, true);
    onClose();
  };

  const handleOnChange = (selectedValues) => {
    if (selectedValues.includes("bulkRemove")) {
      setIsBulkRemove(true);
    }
  };

  const actions = [{ id: "bulkRemove", name: `${t("common:bulk_action.title")}` }];

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>{t("common:actions.select_actions")}</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <FormProvider {...projectForm}>
            <form className="fade" onSubmit={projectForm.handleSubmit(handleFormSubmit)}>
              <Box mb={"4"}>
                <CheckboxGroup name="userId" onValueChange={handleOnChange}>
                  <Stack>
                    {actions.map(({ id, name }) => (
                      <Checkbox
                        value={String(id)}
                        name="userId"
                        alignItems="baseline"
                        colorPalette={"blue"}
                      >
                        {name}
                        {currentGroup?.name}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </Box>
              <SubmitButton leftIcon={<CheckIcon />}>{t("common:actions.apply")}</SubmitButton>
            </form>
          </FormProvider>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
