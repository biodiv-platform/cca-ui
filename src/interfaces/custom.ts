import { UserGroupCCA } from "./userGroup";

export enum Role {
  Any = "ANY",
  User = "ROLE_USER",
  Admin = "ROLE_ADMIN",
  UsergroupFounder = "ROLE_USERGROUP_FOUNDER",
  UsergroupExpert = "ROLE_USERGROUP_EXPERT",
  UsergroupMember = "ROLE_USERGROUP_MEMBER",
  DataCurator = "ROLE_DATACURATOR",
  TemplateCurator = "ROLE_TEMPLATECURATOR",
  ExtDataContributor = "ROLE_EXTDATACONTRIBUTOR",
  PageEditor = "ROLE_PAGE_EDITOR"
}

export interface UserGroupCCAExtended extends UserGroupCCA {
  nameLocal?;
}
