import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { axGetTemplateResponseList } from "@services/cca.service";
import { isBrowser } from "@static/constants";
import { stringify } from "@utils/query-string";
import useTranslation from "next-translate/useTranslation";
import NProgress from "nprogress";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface ResponseListContextProps {
  filtersList;
  responses;
  setResponses;
  aggregation;

  filter;
  addFilter;
  removeFilter;
  resetFilter;

  currentCard;
  setCurrentCard;
}

interface ResponseListProviderProps {
  filtersList;
  initialFilters;
  initialResponses;
  initialAggregation;
  children;
}

const ResponseListContext = createContext<ResponseListContextProps>({} as ResponseListContextProps);

export const ResponseListProvider = ({
  filtersList,
  initialFilters,
  initialResponses,
  initialAggregation,
  children
}: ResponseListProviderProps) => {
  const [responsesI, setResponsesI] = useImmer({ l: initialResponses as any });
  const [filter, setFilter] = useImmer<{ f: any }>({ f: initialFilters as any });
  const [currentCard, setCurrentCard] = useState();
  const [aggregation, setAggregation] = useState(initialAggregation);
  const { lang } = useTranslation();

  const fetchListData = async () => {
    NProgress.start();

    const response = await axGetTemplateResponseList({ ...filter.f, language: lang });
    if (response.success) {
      setResponsesI((_draft) => {
        _draft.l = response.data;
      });
      setAggregation(response.aggregation);
    }

    NProgress.done();
  };

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify(filter.f)}`);
    }
  }, [filter]);

  useDidUpdateEffect(() => {
    fetchListData();
  }, [filter]);

  const addFilter = (key, value) => {
    if (value?.length === 0) {
      removeFilter(key);
      return;
    }

    setFilter((_draft) => {
      _draft.f[key] = value;
    });
  };

  const removeFilter = (key) => {
    setFilter((_draft) => {
      delete _draft.f[key];
    });
  };

  const resetFilter = () => {
    setFilter((_draft) => {
      _draft.f = {};
    });
  };

  return (
    <ResponseListContext.Provider
      value={{
        filtersList,

        responses: responsesI,
        setResponses: setResponsesI,
        aggregation,

        filter,
        addFilter,
        removeFilter,
        resetFilter,

        currentCard,
        setCurrentCard
      }}
    >
      {children}
    </ResponseListContext.Provider>
  );
};

export default function useResponseList() {
  return useContext(ResponseListContext);
}
