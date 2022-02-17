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
