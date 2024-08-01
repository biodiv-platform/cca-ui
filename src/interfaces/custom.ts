import { UserGroupCCA } from "./userGroup";

export enum ResourceType {
  Video = "VIDEO",
  Image = "IMAGE",
  Audio = "AUDIO",
  Unsupported = "UNSUPPORTED"
}

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
  PageEditor = "ROLE_PAGE_EDITOR",
  DocumentContributor = "ROLE_DOCUMENT_CONTRIBUTOR"
}

export interface UserGroupCCAExtended extends UserGroupCCA {
  nameLocal?;
}

export interface ResourceDocument {
  resourceURL: string;
  size: string;
  timestamp: number;
}

export interface DocumentData {
  l: any[];
  mvp: Record<string, unknown>;
  ag?: any;
  n: number;
  hasMore: boolean;
}
