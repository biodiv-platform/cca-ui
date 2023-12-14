import autoToC from "auto-toc";

export const generateToC = (contentSelector, tocSelector) => {
  const content = document.querySelector(contentSelector);
  const headings = content.querySelectorAll("h1, h2, h3, h4, h5, h6, h7");
  const headingMap = {};

  Array.prototype.forEach.call(headings, function (heading) {
    const id = heading.id
      ? heading.id
      : heading.textContent
          .trim()
          .toLowerCase()
          .split(" ")
          .join("-")
          .replace(/[!@#$%^&*():]/gi, "")
          .replace(/\//gi, "-");
    headingMap[id] = !isNaN(headingMap[id]) ? ++headingMap[id] : 0;
    if (headingMap[id]) {
      heading.id = id + "-" + headingMap[id];
    } else {
      heading.id = id;
    }
  });
  autoToC(contentSelector, tocSelector);
};

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
    .replace(/\<table/g, '<div class="table-responsive"><table')
    .replace(/\<\/table\>/g, "</table></div>");

export const convertToMenuFormat = (
  data,
  basePath = "/page/",
  showInPrimaryMenu = false,
  showInSecondaryMenu = false,
  showInFooter = false,
  prefixGroup = true
) => {
  const convertNode = (node) => {
    const menuNode = {
      name: node.title,
      to: basePath + node.id,
      rows: [],
      prefixGroup: prefixGroup
    };

    const filteredChildren = (node.children || []).filter((child) => {
      return (
        (child.showInPrimaryMenu || !showInPrimaryMenu) &&
        (child.showInSecondaryMenu || !showInSecondaryMenu) &&
        (child.showInFooter || !showInFooter)
      );
    });

    if (filteredChildren.length > 0) {
      menuNode.rows = filteredChildren.map((child) => convertNode(child));
    }

    return menuNode;
  };

  const filteredData = data.filter((node) => {
    return (
      (node.showInPrimaryMenu || !showInPrimaryMenu) &&
      (node.showInSecondaryMenu || !showInSecondaryMenu) &&
      (node.showInFooter || !showInFooter)
    );
  });

  return filteredData.map((node) => convertNode(node));
};
