import PagesMenuItem from "./pages-menu-item";

export default [
  {
    name: "header:stats",
    to: "/chart",
    isDarkButton: true
  },
  {
    name: "header:browse",
    to: "/data/list",
    isDarkButton: true
  },
  {
    active: true,
    name: "header:users",
    to: "/user/list"
  },
  {
    cell: PagesMenuItem,
    isLazy: true,
    name: "header:menu_secondary.pages.title",
    active: true
  }
];
