import { axGetDataListPage, axGetMapAndAggregation } from "@services/cca.service";
import { isBrowser, LIST_PAGINATION_LIMIT } from "@static/constants";
import { stringify } from "@utils/query-string";
import useTranslation from "next-translate/useTranslation";
import NProgress from "nprogress";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useImmer } from "use-immer";

interface ResponseListContextProps {
  filtersList;
  nextPage;
  isLoading;
  responses;
  setResponses;
  aggregation;
  map;

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
  children;
}

const ResponseListContext = createContext<ResponseListContextProps>({} as ResponseListContextProps);

export const ResponseListProvider = ({
  filtersList,
  initialFilters,
  children
}: ResponseListProviderProps) => {
  const [responsesI, setResponsesI] = useImmer({ l: [] as any, hasMore: true });
  const [filter, setFilter] = useImmer<{ f: any }>({ f: initialFilters as any });
  const [currentCard, setCurrentCard] = useState();
  const [aggregation, setAggregation] = useState({});
  const [map, setMap] = useState([]);
  const { lang } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchListData = async () => {
    NProgress.start();
    setIsLoading(true);

    const payload = { ...filter.f, language: lang, limit: LIST_PAGINATION_LIMIT };

    if (filter.f.offset === 0) {
      const dataMapAggregation = await axGetMapAndAggregation(payload);
      setAggregation(dataMapAggregation.aggregation);
      setMap(dataMapAggregation.map);
    }

    const response = await axGetDataListPage(payload);
    if (response.success) {
      setResponsesI((_draft) => {
        _draft.l = filter.f.offset === 0 ? response.data : [..._draft.l, ...response.data];
        _draft.hasMore = response.data.length === LIST_PAGINATION_LIMIT;
      });
    }

    NProgress.done();
    setIsLoading(false);
  };

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify(filter.f)}`);
    }
  }, [filter]);

  useEffect(() => {
    fetchListData();
  }, [filter]);

  const addFilter = (key, value) => {
    if (value?.length === 0) {
      removeFilter(key);
      return;
    }

    setFilter((_draft) => {
      _draft.f.offset = 0;
      _draft.f[key] = value;
    });
  };

  const removeFilter = (key) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
      delete _draft.f[key];
    });
  };

  const resetFilter = () => {
    setFilter((_draft) => {
      _draft.f = { offset: 0 };
    });
  };

  const nextPage = () => {
    setFilter((_draft) => {
      _draft.f.offset = Number(_draft.f.offset) + LIST_PAGINATION_LIMIT;
    });
  };

  return (
    <ResponseListContext.Provider
      value={{
        filtersList,
        nextPage,
        isLoading,

        responses: responsesI,
        setResponses: setResponsesI,
        aggregation,
        map,

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
