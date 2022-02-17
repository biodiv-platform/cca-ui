import useGlobalState from "@hooks/use-global-state";
import { Role } from "@interfaces/custom";
import { axUpdateTree } from "@services/pages.service";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface GlobalStateContextProps {
  pages;
  setPages;
  linkType;

  isEditing;
  toggleEditing;
  canEdit;

  isLoading;
  currentPage;
}

interface UsePagesSidebarProviderProps {
  initialPages?;
  linkType: "edit" | "show";
  currentPage?;
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const UsePagesSidebarProvider = ({
  linkType,
  currentPage,
  children
}: UsePagesSidebarProviderProps) => {
  const { t } = useTranslation();
  const { pages, setPages } = useGlobalState();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isEditing, setIsEditing] = useState<boolean>();
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setCanEdit(hasAccess([Role.Admin]));
  }, []);

  useEffect(() => {
    if (isEditing && pages.length) {
      savePages();
    }
  }, [pages]);

  const savePages = async () => {
    setIsLoading(true);
    const { success } = await axUpdateTree(pages);
    if (success) {
      notification(t("page:sidebar.updated"), NotificationType.Success);
    }
    setIsLoading(false);
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  return (
    <GlobalStateContext.Provider
      value={{
        pages,
        currentPage,
        linkType,
        isEditing,
        toggleEditing,
        canEdit,
        setPages,
        isLoading
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default function usePagesSidebar() {
  return useContext(GlobalStateContext);
}
