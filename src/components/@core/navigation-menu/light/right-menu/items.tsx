import PagesMenuItem from "./pages-menu-item";

export default [
  {
    active: false,
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
    active: true,
    cell: PagesMenuItem,
    isLazy: true,
    name: "header:menu_secondary.pages.title"
  }
];
