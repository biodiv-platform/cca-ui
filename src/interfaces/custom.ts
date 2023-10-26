import { UserGroupIbp } from "./cca";

export enum Role {
  Any = "ANY",
  User = "ROLE_USER",
  Admin = "ROLE_ADMIN",
  DataCurator = "ROLE_DATACURATOR",
  TemplateCurator = "ROLE_TEMPLATECURATOR",
  ExtDataContributor = "ROLE_EXTDATACONTRIBUTOR"
}

export interface UserGroupIbpExtended extends UserGroupIbp {
  nameLocal?;
}
