import UserListPageComponent from "@components/pages/user/list";
import { UserListContextProvider } from "@components/pages/user/list/use-user-list";
import React from "react";

export default function UserListPage() {
  return (
    <UserListContextProvider>
      <UserListPageComponent />
    </UserListContextProvider>
  );
}
