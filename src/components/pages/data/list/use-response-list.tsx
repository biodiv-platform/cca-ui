import useGlobalState from "@hooks/use-global-state";
import { UserGroup } from "@interfaces/userGroup";
import { axGetMapAndAggregation, axSearchCCAData, axSearchMapCCAData } from "@services/cca.service";
import { axGetUserGroupList, getAuthorizedUserGroupById } from "@services/usergroup.service";
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
  list_results;
  setListResults;
  map_results;
  setMapResults;
  isSearching;
  setIsSearching;
  query;
  setQuery;

  userGroup?: UserGroup[];
  authorizedUserGroupList?: UserGroup[];
  hasUgAccess?: boolean;
  loggedInUserGroups?: UserGroup[];
}

interface ResponseListProviderProps {
  filtersList;
  initialFilters;
  initialAggregation;
  initialResponses;
  children;
}

const ResponseListContext = createContext<ResponseListContextProps>({} as ResponseListContextProps);

export const ResponseListProvider = ({
  filtersList,
  initialFilters,
  initialAggregation,
  children
}: ResponseListProviderProps) => {
  const [responsesI, setResponsesI] = useImmer({ l: [] as any, hasMore: true, totalCount: 0 });
  const [filter, setFilter] = useImmer<{ f: any }>({ f: initialFilters as any });
  const [currentCard, setCurrentCard] = useState();
  const [aggregation, setAggregation] = useState(initialAggregation || {});
  const [map, setMap] = useState([]);
  const { lang } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [list_results, setListResults] = useState([]);
  const [map_results, setMapResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const fetchListData = async () => {
    NProgress.start();
    setIsLoading(true);
    const payload = { ...filter.f, language: lang, limit: LIST_PAGINATION_LIMIT, query };
    const ccaDataResponse = await axSearchCCAData(payload);
    const ccaMapResponse = await axSearchMapCCAData(payload);
    if (filter.f.offset === 0) {
      const dataMapAggregation = await axGetMapAndAggregation(payload);
      setAggregation(dataMapAggregation.aggregation);
      setMap(dataMapAggregation.map);
    }

    if (ccaDataResponse.success) {
      setResponsesI((_draft) => {
        _draft.l =
          filter.f.offset === 0 ? ccaDataResponse.data : [..._draft.l, ...ccaDataResponse.data];
        _draft.hasMore = ccaDataResponse.data.length === LIST_PAGINATION_LIMIT;
        _draft.totalCount = ccaMapResponse.data.length;
        setMap(ccaMapResponse.data);
      });
    }

    NProgress.done();
    setIsLoading(false);
  };

  const [loggedInUserGroups, setLoggedInUserGroups] = useState<any[]>([]);
  const [hasUgAccess, setHasUgAdminAccess] = useState<boolean>(false);
  const [authorizedUserGroupList, setAuthorizedUserGroupList] = useState<any[]>([]);
  const { isLoggedIn } = useGlobalState();

  useEffect(() => {
    if (isLoggedIn) {
      axGetUserGroupList().then(({ data }) => setLoggedInUserGroups(data));
      getAuthorizedUserGroupById().then(({ data }) => {
        setHasUgAdminAccess(data?.isAdmin || false);
        setAuthorizedUserGroupList(data?.ugList || []);
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify(filter.f)}`);
    }
  }, [filter]);

  useEffect(() => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
    });
  }, [map_results]);

  useEffect(() => {
    fetchListData();
  }, [filter, isSearching]);

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
        setCurrentCard,
        list_results,
        setListResults,
        map_results,
        setMapResults,
        isSearching,
        setIsSearching,
        query,
        setQuery,
        loggedInUserGroups,
        hasUgAccess,
        authorizedUserGroupList
      }}
    >
      {children}
    </ResponseListContext.Provider>
  );
};

export default function useResponseList() {
  return useContext(ResponseListContext);
}
