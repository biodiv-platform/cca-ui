import SITE_CONFIG from "@configs/site-config";

export const getPagesMenu = (children) => {
  return children.map((l) => {
    const link = { name: l.title, to: `/page/${l.id}` };
    if (l.children.length > 0) {
      return { ...link, rows: getPagesMenu(l.children) };
    }
    return link;
  });
};

export const treeToFlat = (children: any[], parentId = 0) =>
  children.reduce(
    (acc, cv, pageIndex) => [
      {
        id: cv.id,
        parentId,
        pageIndex
      },
      ...(cv.children.length ? treeToFlat(cv.children, cv.id) : []),
      ...acc
    ],
    []
  );

export const preProcessContent = (content) =>
  content
    ?.replace(/\<table/g, '<div class="table-responsive"><table')
    ?.replace(/\<\/table\>/g, "</table></div>");

export const getFooterLinks = (pages, language) => {
  return pages?.find((p) => p.id === SITE_CONFIG.FOOTER.PARENT_PAGE_ID[language])?.children || [];
};
