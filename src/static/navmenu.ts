import { Role } from "@interfaces/custom";

export const containerMaxW = { md: "6xl", lg: "7xl" };

export const header = [
  {
    title: "header:participate",
    url: "/participate/list",
    access: [Role.Any],
    preview: false
  },
  {
    title: "header:templates",
    url: "/template/list",
    access: [Role.Admin, Role.TemplateCurator]
  },
  {
    title: "header:browse",
    url: "/data/list",
    access: [Role.Any],
    isDarkButton: true
  }
];
