import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import React, { useMemo } from "react";

import CheckboxFilterPanel from "../checkbox";

export default function UserGroupFilter() {
  const { currentGroup, groups } = useGlobalState();
  const groupOptions = useMemo(
    () => groups?.map((g) => ({ label: g.name, value: g.id?.toString() })),
    [groups]
  );

  return !currentGroup?.id && SITE_CONFIG.USERGROUP.ACTIVE ? (
    <CheckboxFilterPanel
      filterKey="usergroups"
      options={groupOptions}
      showSearch={true}
      skipOptionsTranslation={true}
      translateKey="filters:usergroup."
      statKey="usergroups"
    />
  ) : null;
}
