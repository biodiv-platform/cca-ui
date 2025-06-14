import { filterXSS } from "xss";

/**
 * Detacts Links in text and automatically links them
 *
 * @param {*} text
 * @returns
 */
const URLify = (text) => {
  const urlRegex =
    /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
  return text?.replace(urlRegex, '$1<a rel="noreferrer noopener" target="_blank" href="$2">$2</a>');
};

/**
 * Takes raw HTML from back-end and returns URLified sanitized HTML
 *
 * @param {*} nHtml
 * @returns
 */
export const getInjectableHTML = (nHtml): string => {
  try {
    if (nHtml) {
      return filterXSS(URLify(nHtml), {
        whiteList: {
          a: ["href", "title", "class", "rel", "target"],
          b: [],
          br: [],
          caption: [],
          div: ["class"],
          em: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src"],
          li: [],
          p: ["class"],
          strong: [],
          table: ["border"],
          tbody: [],
          td: ["colspan", "rowspan", "style"],
          tr: ["style"],
          ul: []
        },
        stripIgnoreTag: true
      });
    }
  } catch (e) {
    console.error(e);
  }
  return "";
};

export const covertToSentenceCase = (text): string => {
  if (!text) return "";

  const result = text.replace(/[^a-zA-Z ]/g, " ").toLowerCase();
  return `${result[0].toUpperCase()}${result.slice(1)}`;
};

export const stripSpecialCharacters = (text): string => {
  return text.replace(/(\B[A-Z])/g, " $1").replace(/^./, text[0].toUpperCase());
};

export const stripTags = (string: string | null | undefined): string | undefined =>
  string ? string.replace(/<[^>]*>/g, "") : undefined;
