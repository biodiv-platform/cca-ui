import { axGetTemplateResponseTableByShortName } from "@services/cca.service";
import React, { createContext, useContext, useEffect } from "react";
import { useImmer } from "use-immer";

interface TemplateResponseContextProps {
  shortName;
  fields;
  responses;
  setResponses;
  loadMore;
}

interface TemplateResponseProviderProps {
  shortName;
  fields;
  children;
}

const TemplateResponseContext = createContext<TemplateResponseContextProps>(
  {} as TemplateResponseContextProps
);

export const TemplateResponseProvider = ({
  shortName,
  fields,
  children
}: TemplateResponseProviderProps) => {
  const [responsesI, setResponsesI] = useImmer({ l: [] as any });
  const payload = { shortName, projectAll: false };

  const loadMore = async () => {
    const { data } = await axGetTemplateResponseTableByShortName(payload);

    if (!data) return;

    setResponsesI((_draft) => {
      _draft.l = data || [];
    });
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <TemplateResponseContext.Provider
      value={{
        shortName,
        fields,

        responses: responsesI,
        setResponses: setResponsesI,

        loadMore
      }}
    >
      {children}
    </TemplateResponseContext.Provider>
  );
};

export default function useTemplateResponse() {
  return useContext(TemplateResponseContext);
}
