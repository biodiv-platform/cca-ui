import useGlobalState from "@hooks/use-global-state";
import { axMemberGroupList, axMemberGroupListByUserId } from "@services/usergroup.service";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface GroupListFilterContextProps {
  children?;
  filter?;
  groupListData?;
  groupJoinedStatus?;
  setGroupJoinedStatus?;
  userId?;
}

const GroupListFilterContext = createContext<GroupListFilterContextProps>(
  {} as GroupListFilterContextProps
);

export const GroupListFilterProvider = (props) => {
  const [groupListData] = useImmer(props.userGroupList);
  const { isLoggedIn } = useGlobalState();
  const [groupJoinedStatus, setGroupJoinedStatus] = useState<any>();

  useEffect(() => {
    if (props.userId) {
      axMemberGroupListByUserId(props.userId).then(({ data }) => setGroupJoinedStatus(data));
    } else if (isLoggedIn) {
      axMemberGroupList().then(({ data }) => setGroupJoinedStatus(data));
    } else {
      setGroupJoinedStatus({});
    }
  }, [isLoggedIn, props.userId]);

  return (
    <GroupListFilterContext.Provider
      value={{ groupListData, userId: props.userId, groupJoinedStatus, setGroupJoinedStatus }}
    >
      {props.children}
    </GroupListFilterContext.Provider>
  );
};

export default function useGroupListFilter() {
  return useContext(GroupListFilterContext);
}
