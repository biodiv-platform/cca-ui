import SITE_CONFIG from "@configs/site-config";
import { axPullTemplateTranslations, axUpdateTemplate } from "@services/cca.service";
import { addOrUpdateObjectById, deleteObjectById } from "@utils/json";
import notification, { NotificationType } from "@utils/notification";
import useTranslation from "next-translate/useTranslation";
import React, { createContext, useContext, useState } from "react";
import { toggleExpandedForAll } from "react-sortable-tree";
import uuid from "uuid-random";

interface TemplateContextProps {
  masterTemplate;
  templateList;
  template;
  saveTemplate;
  pullTranslations;
  setMeta;
  setFields;
  createOrUpdateField;
  copyField;

  areFieldsReadOnly;

  currentField;
  removeFieldById;
  setCurrentField;
  clearCurrentField;
  createNewField;
}

interface TemplateProviderProps {
  templateList;
  initialTemplate;
  masterTemplate;
  language;
  children;
}

const TemplateContext = createContext<TemplateContextProps>({} as TemplateContextProps);

export const TemplateProvider = ({
  templateList,
  initialTemplate,
  masterTemplate,
  language,
  children
}: TemplateProviderProps) => {
  const [template, setTemplateI] = useState({
    ...initialTemplate,
    language: language,
    fields: toggleExpandedForAll({ treeData: initialTemplate.fields, expanded: true })
  });
  const [currentField, setCurrentFieldI] = useState<any>();
  const { t } = useTranslation();
  const areFieldsReadOnly = language !== SITE_CONFIG.LANG.DEFAULT;

  const setMeta = (values) => {
    const payload = { ...template, ...values };

    setTemplateI(payload);
    saveTemplateI(payload);
  };

  const setFields = (fields) => {
    setTemplateI({ ...template, fields, isSaved: false });
  };

  const createOrUpdateField = (field) => {
    setTemplateI({
      ...template,
      fields: addOrUpdateObjectById(template.fields, field),
      isSaved: false
    });
    clearCurrentField();
  };

  const setCurrentField = (currentField) => {
    setCurrentFieldI(currentField);
  };

  const clearCurrentField = () => {
    setCurrentFieldI(undefined);
  };

  const createNewField = () => {
    setCurrentFieldI({
      fieldId: uuid(),
      valueOptions: [],
      children: [],
      isNew: true
    });
  };

  const removeFieldById = (fieldId) => {
    if (confirm(t("template:delete_confirm"))) {
      setTemplateI({
        ...template,
        fields: deleteObjectById(template.fields, fieldId),
        isSaved: false
      });
    }
  };

  const saveTemplateI = async (payload) => {
    const { success } = await axUpdateTemplate(payload);

    if (success) {
      setTemplateI({ ...template, isSaved: true });

      notification(t("template:update.success"), NotificationType.Success);
    } else {
      notification(t("template:update.error"));
    }
  };

  const saveTemplate = async () => saveTemplateI(template);

  const copyField = async (field) => {
    setTemplateI({ ...template, fields: [...template.fields, field], isSaved: false });
  };

  const pullTranslations = async () => {
    const { success, data } = await axPullTemplateTranslations({
      language: template.language,
      templateId: template.id
    });

    if (success) {
      setTemplateI({
        ...template,
        fields: data.fields,
        isSaved: false
      });
      notification(t("template:pull.success"), NotificationType.Success);
    } else {
      notification(t("template:pull.error"));
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        masterTemplate,
        templateList,
        template,
        saveTemplate,
        pullTranslations,

        areFieldsReadOnly,

        setMeta,
        setFields,
        createOrUpdateField,
        copyField,

        currentField,
        removeFieldById,
        clearCurrentField,
        setCurrentField,
        createNewField
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export default function useTemplate() {
  return useContext(TemplateContext);
}
