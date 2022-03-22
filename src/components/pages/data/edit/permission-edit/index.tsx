import { getUserIBPsByIds } from "@services/user.service";
import React, { useEffect, useState } from "react";

import useTemplateResponseEdit from "../use-template-response-edit";
import UserPermissionEditor from "./user-permission-edit";

export default function PermissionEdit() {
  const { response } = useTemplateResponseEdit();

  const [users, setUsers] = useState<any>();
  const [author, setAuthor] = useState<any>();

  const getInitialUsers = async () => {
    const [_author] = await getUserIBPsByIds([response.userId]);
    setAuthor(_author);

    const data = await getUserIBPsByIds(response.allowedUsers);
    setUsers(data.map((user) => ({ label: user.name, value: user.id })));
  };

  useEffect(() => {
    getInitialUsers();
  }, []);

  return users && author ? <UserPermissionEditor initialUsers={users} author={author} /> : null;
}
