import { UserGroupIbp } from "./userGroup";

export interface CCAField {
  fieldId?: string;
  name?: string;
  isRequired?: boolean;
  question?: string;
  type?: string;
  valueOptions?: string[];
  childrens?: CCAField[];
}
export interface CCATemplate {
  id?: string;
  name?: string;
  description?: string;
  shortName?: string;
  fields?: CCAField[];
}

export interface CCAUserPermission {
  validatePermissionCCA?: number /* int64 */[];
  userGroupMember?: UserGroupIbp[];
  userGroupFeature?: UserGroupIbp[];
  following?: boolean;
}
