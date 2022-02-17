import { Role } from "@interfaces/custom";
import { TOKEN } from "@static/constants";
import { AUTHWALL } from "@static/events";
import B64URL from "base64-url";
import JWTDecode from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { emit } from "react-gbus";

// sets/re-sets cookies on development mode
export const setCookies = (tokens, ctx?) => {
  const cookieOpts = {
    maxAge: 60 * 60 * 24 * 7, // 1 Week
    path: "/"
  };

  setCookie(ctx, TOKEN.BATOKEN, tokens.access_token, cookieOpts);
  setCookie(ctx, TOKEN.BRTOKEN, tokens.refresh_token, cookieOpts);
};

export const removeCookies = () => {
  const cookieOpts = {
    path: "/"
  };

  destroyCookie(null, TOKEN.BATOKEN, cookieOpts);
  destroyCookie(null, TOKEN.BRTOKEN, cookieOpts);
};

export const forwardRedirect = async (forward?) => {
  // redirect
  window.location.assign(B64URL.decode(forward || "Lw"));
};

export const getParsedUser = (ctx?) => {
  const cookies = parseCookies(ctx);
  const accessToken = cookies?.[TOKEN.BATOKEN];
  const refreshToken = cookies?.[TOKEN.BRTOKEN];

  if (accessToken) {
    const decoded: any = JWTDecode(accessToken);
    return {
      ...decoded,
      id: parseInt(decoded.id),
      accessToken,
      refreshToken
    };
  }

  return {};
};

export const isTokenExpired = (exp) => {
  const currentTime = Date.now() / 1000;
  return exp ? exp < currentTime : true;
};

export const hasAccess = (allowedRoles: Role[], ctx?) => {
  const u = getParsedUser(ctx);

  if (allowedRoles.includes(Role.Any)) {
    return true;
  }

  for (const allowedRole of allowedRoles) {
    if (u?.roles?.includes(allowedRole)) {
      return true;
    }
  }
  return false;
};

/**
 * 🌈 On the spot authorization wrapped in a one magical promise
 *
 * @returns {Promise<Record<string, unknown>>}
 */
export const waitForAuth = (): Promise<Record<string, unknown>> => {
  return new Promise((resolve: any, reject) => {
    const u = getParsedUser();
    u?.id ? resolve() : emit(AUTHWALL.INIT, { resolve, reject });
  });
};

export const adminOrAuthor = (authorId, ctx?) => {
  const u = getParsedUser(ctx);
  return u?.id === Number(authorId) || hasAccess([Role.Admin], ctx);
};

/**
 * returns success if user is admin or datacurator or owner of that `data`
 *
 * @param {*} authorId
 * @param {*} [ctx]
 * @return {*}
 */
export const canEditData = (authorId, ctx?) => {
  const u = getParsedUser(ctx);
  return u?.id === Number(authorId) || hasAccess([Role.Admin, Role.DataCurator], ctx);
};
