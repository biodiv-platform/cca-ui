import SITE_CONFIG from "@configs/site-config";
import {
  FORM_TYPE,
  MINMAX_DATE_FORM_TYPES,
  OPTION_FORM_TYPES,
  OPTION_SEPRATOR
} from "@static/constants";

import { formatDateFromUTC, formatYearFromUTC } from "./date";
import { stripTags } from "./text";

const postProcessValue = (field, value, othersValue?) => {
  // Does reverse lookup and sends label and value pair for option types
  // Also takes care of replacing others value with label
  if (OPTION_FORM_TYPES.includes(field.type)) {
    if (!value || value?.length === 0) {
      return value;
    }

    if (Array.isArray(value)) {
      const valueMulti = field.valueOptions.filter((opt) => value.includes(opt.value));

      return valueMulti.map((opt) =>
        isOthersField(opt.value) ? { ...opt, label: othersValue } : opt
      );
    }

    const valueSingle = field.valueOptions.find((opt) => value === opt.value);

    return isOthersField(valueSingle.value) ? { ...valueSingle, label: othersValue } : valueSingle;
  }

  if (field.type === FORM_TYPE.GEOMETRY && value?.length) {
    return {
      type: "FeatureCollection",
      features: value?.map((v) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: v.type,
          coordinates: v.coordinates
        }
      }))
    };
  }

  return value;
};

export function toFlatSaveData(fieldList, { others, terms, ...fieldValues }) {
  const newFieldList = Object.fromEntries(fieldList.map((field) => [field.fieldId, field]));

  const ccaFieldValues = Object.entries(fieldValues).map(([fieldId, value]) => [
    fieldId,
    {
      fieldId,
      name: newFieldList[fieldId].name,
      type: newFieldList[fieldId].type,
      value: postProcessValue(newFieldList[fieldId], value, others?.[fieldId])
    }
  ]);

  return Object.fromEntries(ccaFieldValues);
}

export const reverseFlatSaveData = (field, value: any) => {
  let defaultValues: any = { [field.fieldId]: value, others: {} };

  if (OPTION_FORM_TYPES.includes(field.type)) {
    if (Array.isArray(value)) {
      const initialOptions: any[] = [];

      value.map((v) => {
        if (isOthersField(v.value)) {
          defaultValues = {
            ...defaultValues,
            others: { [field.fieldId]: v?.label }
          };
        }
        initialOptions.push(v.value);
      });

      defaultValues = {
        ...defaultValues,
        [field.fieldId]: initialOptions
      };
    } else {
      defaultValues = {
        ...defaultValues,
        [field.fieldId]: value?.value,
        others: { [field.fieldId]: value?.label }
      };
    }
  } else if (field.type === FORM_TYPE.GEOMETRY) {
    defaultValues = { [field.fieldId]: value?.features?.map((f) => f?.geometry) };
  }

  return defaultValues;
};

export const simplifyDTPayload = (fields, data) => {
  const newFields = flattenFields(fields);
  console.warn("newFields ",newFields[1].fieldId);
  console.warn("Fields name",newFields[1].name);


  return {
    columns: newFields.map((field) => ({
      name: field.name,
      selector: (row) => row[field.fieldId].value,
      maxWidth: "250px",

      //for spreadsheet download
      label: field.name,
      value: field.fieldId
    })),
    data: data?.map((row) => {
      const newFieldsData = newFields.map((field) => [
        field.fieldId,
        {
          value: formatDTValue(row, field),
          raw: row?.ccaFieldValues?.[field.fieldId]
        }
      ]);
      newFieldsData.push(["id", row.value]);
      console.warn("newFieldsData ",newFieldsData)
      console.warn("Object.fromEntries(newFieldsData) ",Object.fromEntries(newFieldsData))
      return Object.fromEntries(newFieldsData);
    })
  };
};

const formatDTValue = (row, field) => {
  const v = row?.ccaFieldValues?.[field.fieldId]?.value;

  if (["string"].includes(typeof v)) {
    return stripTags(v);
  }

  if (["number"].includes(typeof v)) {
    return v;
  }

  if (OPTION_FORM_TYPES.includes(field.type)) {
    return Array.isArray(v) ? v?.map((o) => o.value).toString() : v?.value;
  }

  return JSON.stringify(v);
};

export const splitIntoGroups = (fieldList) => {
  const fieldGroupList: any[] = [];
  const fieldGroup: any = {
    heading: { fieldId: "Untitled", name: "Untitled", type: FORM_TYPE.HEADING },
    fields: []
  };

  fieldList.map((field) => {
    if (field.type === FORM_TYPE.HEADING) {
      if (fieldGroup.fields.length > 0) {
        fieldGroupList.push({ ...fieldGroup });
      }

      // reset
      fieldGroup.heading = field;
      fieldGroup.fields = [];
    } else {
      fieldGroup.fields.push(field);
    }
  });

  fieldGroupList.push({ ...fieldGroup });

  return fieldGroupList;
};

export const arrayOfSize = (size) => new Array(size).fill(0).map((_, index) => index);

export const isOthersField = (value) => value.replace(/\s/g, "").includes("?");

export const optionLabelShow = (label, value?) =>
  value?.startsWith("http")
    ? `<a target="_blank" rel="noopener noreferrer" href="${value}">${label}</a>`
    : label?.replace(OPTION_SEPRATOR, " → ");

export const filterLabelShow = ({ value, label }) =>
  isOthersField(value) ? label.replace(/\([^()]*\)/g, "") : label;

export const flattenFields = (fields) => {
  const flatFields: any = [];

  fields.map((field) => {
    flatFields.push(field);
    if (field.children.length) {
      flatFields.push(...flattenFields(field.children));
    }
  });
  console.warn("flatFields ", flatFields);
  return flatFields;
};

export const namedFormErrorMessage = (message, name, title) =>
  title ? message?.replace(name, title) : message;

export const findTitleFromHeader = (header) => {
  return header.values.find((v) => SITE_CONFIG.CCA.TITLE_FIELD_IDS.includes(v.fieldId))?.value;
};

export const renderSimpleValue = (value, type, numHa?) => {
  if (!value) return null;

  if (OPTION_FORM_TYPES.includes(type)) {
    return Array.isArray(value)
      ? value
          ?.map((v) => (isOthersField(v.value) ? v.label : optionLabelShow(v.label, v.value)))
          ?.join(", ")
      : optionLabelShow(value?.label, value?.value);
  }

  if (MINMAX_DATE_FORM_TYPES.includes(type)) {
    if (type === FORM_TYPE.YEAR) {
      return formatYearFromUTC(value);
    }

    const values = Array.isArray(value) ? value : [value];

    return values.map((v) => formatDateFromUTC(v)).join(" - ");
  }

  if (type === FORM_TYPE.NUMBER && numHa) {
    return `${value} ha`;
  }

  return value;
};

export const cleanAggregationData = (aggregationData) => {
  return Object.fromEntries(
    Object.entries(aggregationData).map(([fieldName, options]: any) => {
      // if field type is number
      if (options?.[0]?.max) {
        return [fieldName, options[0]];
      }

      return [fieldName, Object.fromEntries(options.map((o) => [o._id, o.count || 0]))];
    })
  );
};

export const transformGroupedOption = (options) => {
  const newOptions = {};

  for (const option of options) {
    if (option.value.includes(OPTION_SEPRATOR)) {
      const ol = option.label || "";
      const parentLabel = ol.split(OPTION_SEPRATOR)[0].trim();
      const parentValue = option.value.split(OPTION_SEPRATOR)[0].trim();

      if (!newOptions[parentValue]) {
        newOptions[parentValue] = {
          label: parentLabel,
          value: parentValue,
          children: []
        };
      }

      const [preLabel, postLabel] = ol.split(OPTION_SEPRATOR);

      newOptions[parentValue].children.push({
        ...option,
        label: postLabel || preLabel
      });
    } else {
      newOptions[option.value] = { ...option, children: [] };
    }
  }

  return Object.values(newOptions);
};
