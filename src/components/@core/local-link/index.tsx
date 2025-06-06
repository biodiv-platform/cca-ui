import useGlobalState from "@hooks/use-global-state";
import { parseUrl, stringify } from "@utils/query-string";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { cloneElement } from "react";

interface Props extends Omit<Omit<LinkProps, "href">, "as"> {
  href: string | undefined;
  as?: string;
  children?: any;
  className?: string;
  params?: Record<string, unknown>;
  prefixGroup?: boolean;
  hardLink?: boolean;
}

/**
 * This function will take raw URL and perform follow operations to ensure maximum `next/link` compatibility
 * 1. squash query params
 * 2. preserve `lang` on page url
 * 3. as URL passed are going to be absolute this will try to make it relative w/ removing domain prefix
 *
 * @param {*} href
 * @param {*} router
 * @param {*} [params={}]
 * @param {*} [prefixGroup]
 * @param {*} [currentGroup]
 * @returns {string}
 */
const getLocalPath = (href, params = {}, prefixGroup?, currentGroup?) => {
  const groupPrefixPath =
    currentGroup && prefixGroup && !href.startsWith("http") ? currentGroup + href : href;

  const cleanPath = groupPrefixPath.startsWith(currentGroup)
    ? groupPrefixPath.replace(/^.*\/\/[^\/]+/, "")
    : groupPrefixPath;

  const newParams = stringify({ ...parseUrl(href).query, ...params });

  return cleanPath + (newParams ? `?${newParams}` : "");
};

export function useLocalRouter() {
  const router = useRouter();
  const { currentGroup } = useGlobalState();

  function push(href, prefixGroup = false, params = {}, useWindow = false) {
    const to = getLocalPath(href, params, prefixGroup, currentGroup?.webAddress);

    to.startsWith("http") || useWindow ? window.location.assign(to) : router.push(to);
  }

  function link(href, prefixGroup = false, params = {}) {
    return getLocalPath(href, params, prefixGroup, currentGroup?.webAddress);
  }

  return { ...router, push, link };
}

function LocalLink({ prefixGroup, params, ...props }: Props) {
  if (!props.href) {
    return props.children;
  }

  const { currentGroup } = useGlobalState();
  const localPath = getLocalPath(props.href, params, prefixGroup, currentGroup?.webAddress);

  return localPath.startsWith("http") || props?.hardLink ? (
    cloneElement(props.children, { ...props?.children?.props, href: localPath })
  ) : (
    <Link {...props} href={localPath} prefetch={false} passHref={true} />
  );
}

export default LocalLink;
