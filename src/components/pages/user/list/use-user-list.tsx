import { axGetUserList } from "@services/user.service";
import { isBrowser } from "@static/constants";
import NProgress from "nprogress";
import { stringify } from "querystring";
import React, { createContext, useContext, useEffect } from "react";
import { useImmer } from "use-immer";

const LIST_PAGINATION_LIMIT = 10;

export interface UserListData {
  l: any[];
  ag: any;
  n: number;
  hasMore: boolean;
}

interface UserListContextProps {
  userList?: UserListData;
  addFilter?;
  removeFilter?;
  children?;
  nextPage?;
  setFilter?;
  resetFilter?;
}

const UserListContext = createContext<UserListContextProps>({} as UserListContextProps);

export function UserListContextProvider(props: UserListContextProps) {
  const [filter, setFilter] = useImmer<any>({ f: { offset: 0 } });
  const [userList, setuserList] = useImmer<any>({ l: [], ag: {}, n: 0, hasMore: false });

  useEffect(() => {
    if (isBrowser) {
      window.history.pushState("", "", `?${stringify({ ...filter.f })}`);

      fetchListData();
    }
  }, [filter]);

  const fetchListData = async () => {
    try {
      NProgress.start();

      const { data } = await axGetUserList(filter.f);
      setuserList((_draft) => {
        if (data?.userList?.length) {
          const l = data.userList.map((o) => o.user);
          if (filter.f?.offset === 0) {
            _draft.l = l;
          } else {
            _draft.l.push(...l);
          }
          _draft.hasMore = data.userList.length === LIST_PAGINATION_LIMIT;
          _draft.ag = data.aggregationData;
        } else {
          _draft.hasMore = false;
        }
        _draft.n = data.totalCount;
      });
      NProgress.done();
    } catch (e) {
      console.error(e);
      NProgress.done();
    }
  };

  const nextPage = () => {
    setFilter((_draft) => {
      _draft.f.offset = Number(_draft.f.offset) + LIST_PAGINATION_LIMIT;
    });
  };

  const addFilter = (key, value) => {
    setFilter((_draft) => {
      _draft.f.offset = 0;
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
      _draft.f = { offset: 0 };
    });
  };

  return (
    <UserListContext.Provider
      value={{
        userList,
        addFilter,
        setFilter,
        removeFilter,
        nextPage,
        resetFilter
      }}
    >
      {props.children}
    </UserListContext.Provider>
  );
}

export default function useUserList() {
  return useContext(UserListContext);
}
