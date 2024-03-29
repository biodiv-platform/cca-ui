import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { axUpdateUsergroup } from "@services/cca.service";
import { hasAccess } from "@utils/auth";
import React, { useEffect, useMemo, useState } from "react";

import GroupPost from "./group-post";

export default function Group({ ccaId, groups, defaultGroups, memberGroups }) {
  const { isLoggedIn } = useGlobalState();

  const [hideFeature, setHideFeature] = useState(true);

  useEffect(() => {
    setHideFeature(!hasAccess([Role.Admin, Role.UsergroupFounder]));
  }, [isLoggedIn]);

  const defaultGroup = useMemo(
    () => groups?.filter((item) => defaultGroups?.includes(item.id)),
    []
  );

  const filteredGroups = groups.filter((group) => memberGroups[group.id]);

  return (
    <Box m={4} className="white-box" data-hidden={!SITE_CONFIG.USERGROUP.ACTIVE && hideFeature}>
      <Box m={4}>
        <GroupPost
          groups={filteredGroups}
          selectedDefault={defaultGroup}
          resourceId={ccaId}
          saveUserGroupsFunc={axUpdateUsergroup}
        />
      </Box>
    </Box>
  );
}
