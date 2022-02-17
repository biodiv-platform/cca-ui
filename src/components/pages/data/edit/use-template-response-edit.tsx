import React, { createContext, useContext, useState } from "react";

interface TemplateResponseEditContextProps {
  template;
  response;
  setResponse;
  canEdit;
}

interface TemplateResponseEditProviderProps {
  template;
  initialResponse;
  canEdit;
  children;
}

const TemplateResponseEditContext = createContext<TemplateResponseEditContextProps>(
  {} as TemplateResponseEditContextProps
);

export const TemplateResponseEditProvider = ({
  template,
  initialResponse,
  canEdit,
  children
}: TemplateResponseEditProviderProps) => {
  const [response, setResponse] = useState(initialResponse);

  return (
    <TemplateResponseEditContext.Provider
      value={{
        template,
        canEdit,

        response,
        setResponse
      }}
    >
      {children}
    </TemplateResponseEditContext.Provider>
  );
};

export default function useTemplateResponseEdit() {
  return useContext(TemplateResponseEditContext);
}
