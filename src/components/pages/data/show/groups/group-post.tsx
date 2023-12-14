import { Box, Button, Collapse, Heading, Input, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import EditIcon from "@icons/edit";
import { UserGroupIbp } from "@interfaces/userGroup";
import { DEFAULT_GROUP } from "@static/constants";
import { waitForAuth } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import debounce from "debounce-promise";
import useTranslation from "next-translate/useTranslation";
import React, { useRef, useState } from "react";

import CheckBoxItems from "../../user-groups/checkbox";
import GroupBox from "./group-box";

interface IGroupPostProps {
  groups: UserGroupIbp[] | undefined;
  selectedDefault: UserGroupIbp[] | undefined;
  resourceId;
  saveUserGroupsFunc;
  columns?;
}

const defaultGridColumns = [1, 1, 2, 3];

export default function GroupPost({
  groups = [],
  selectedDefault,
  resourceId,
  saveUserGroupsFunc,
  columns
}: IGroupPostProps) {
  if (groups?.length == 0) return null;

  const [finalGroups, setFinalGroups] = useState(selectedDefault);
  const [selectedGroups, setSelectedGroups] = useState<any>(
    selectedDefault?.map((g) => g?.id?.toString())
  );
  const { t } = useTranslation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const editButtonRef: any = useRef(null);

  const [filterGroups, setFilterGroups] = useState(groups);

  const onQuery = debounce((e) => {
    setFilterGroups(
      groups?.filter((i) => i.name?.toLowerCase().match(e.target.value.toLowerCase()))
    );
  }, 200);

  const handleOnSave = async () => {
    const groupsList = selectedGroups.map((i) => Number(i));

    const payload = {
      id: resourceId,
      usergroups: groupsList
    };

    const { success, data } = await saveUserGroupsFunc(payload);

    const usergroupsAsIntegers = (data?.usergroups ?? []).map(Number);

    const postedGroups = groups.filter((group) => usergroupsAsIntegers.includes(group.id));

    if (success) {
      setFinalGroups(postedGroups || []);
      notification(t("Groups updated sucessfully"), NotificationType.Success);
      editButtonRef.current.focus();
      onClose();
    } else {
      notification(t("Groups_update_failed"), NotificationType.Error);
    }
  };

  const handleOnCancel = () => {
    onClose();
    editButtonRef.current.focus();
  };

  const onEditClick = async () => {
    await waitForAuth();
    onToggle();
  };

  return (
    <Box>
      <SimpleGrid columns={3}>
        <Heading>
          👥 {t("Groups")}
          <Button
            mb={6}
            variant="link"
            rightIcon={<EditIcon />}
            colorScheme="blue"
            size="lg"
            className="no-print"
            ref={editButtonRef}
            onClick={onEditClick}
          />
        </Heading>
      </SimpleGrid>

      <SimpleGrid columns={columns || defaultGridColumns} spacing={4} hidden={isOpen}>
        <GroupBox
          link={DEFAULT_GROUP.webAddress}
          icon={`${DEFAULT_GROUP.icon}?h=40`}
          name={DEFAULT_GROUP.name}
        />
        {finalGroups
          ?.filter((o) => o) // filters out null objects
          .map((og) => (
            <GroupBox key={og.id} link={og.webAddress} icon={og.icon + "?h=40"} name={og.name} />
          ))}
      </SimpleGrid>

      <Collapse in={isOpen} unmountOnExit={true}>
        <Input mb={6} onChange={onQuery} placeholder={t("header:search")} />
        {groups?.length > 0 ? (
          <CheckBoxItems
            gridColumns={columns || defaultGridColumns}
            options={filterGroups}
            defaultValue={selectedGroups}
            onChange={setSelectedGroups}
          />
        ) : (
          <div>{t("common:no_groups_joined")}</div>
        )}

        <Box mt={2}>
          <Button
            size="sm"
            colorScheme="blue"
            aria-label="Save"
            type="submit"
            onClick={handleOnSave}
          >
            {t("common:save")}
          </Button>
          <Button size="sm" ml={2} colorScheme="gray" aria-label="Cancel" onClick={handleOnCancel}>
            {t("common:close")}
          </Button>
        </Box>
      </Collapse>
    </Box>
  );
}
