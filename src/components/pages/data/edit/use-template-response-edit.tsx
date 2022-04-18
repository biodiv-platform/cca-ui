import React, { createContext, useContext, useState } from "react";

interface TemplateResponseEditContextProps {
  template;
  response;
  setResponse;
  canEdit;
  canEditEditors;

  isEdit;
  setIsEdit;
}

interface TemplateResponseEditProviderProps {
  template;
  initialResponse;
  canEdit;
  canEditEditors;
  children;
}

const TemplateResponseEditContext = createContext<TemplateResponseEditContextProps>(
  {} as TemplateResponseEditContextProps
);

export const TemplateResponseEditProvider = ({
  template,
  initialResponse,
  canEdit,
  canEditEditors,
  children
}: TemplateResponseEditProviderProps) => {
  const [response, setResponse] = useState(initialResponse);

  const [isEdit, setIsEdit] = useState<boolean>();

  return (
    <TemplateResponseEditContext.Provider
      value={{
        template,
        canEdit,
        canEditEditors,

        response,
        setResponse,

        isEdit,
        setIsEdit
      }}
    >
      {children}
    </TemplateResponseEditContext.Provider>
  );
};

export default function useTemplateResponseEdit() {
  return useContext(TemplateResponseEditContext);
}
