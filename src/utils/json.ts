export const addOrUpdateObjectById = (data, _updatedField) => {
  let found = false;

  const updatedField = JSON.parse(JSON.stringify(_updatedField));

  const fx = (list) => {
    if (!list?.length) return [];

    return list.map((field) => {
      const { children, ...restKeys } = field;

      if (field.fieldId === updatedField.fieldId) {
        found = true;
        return {
          ...restKeys,
          ...updatedField,
          children
        };
      }

      return {
        ...restKeys,
        children: fx(children)
      };
    });
  };

  const newOb = fx(data);

  return found ? newOb : [...data, updatedField];
};

export const deleteObjectById = (data, fieldId) => {
  const fx = (list) => {
    if (!list.length) return [];

    return list
      .filter((f) => f.fieldId !== fieldId)
      .map(({ children, ...restKeys }) => ({ ...restKeys, children: fx(children) }));
  };

  return fx(data);
};

const discardKeys = (data) => {
  if (!data?.length) return [];

  return data.map((fields) => {
    const { expanded, children, ...rest } = fields;
    return { ...rest, children: discardKeys(children) };
  });
};

export const cleanTemplate = ({ fields, isSaved, ...rest }) => ({
  ...rest,
  fields: discardKeys(fields)
});

/**
 * Iterates through template and adds `isMasterField` to `true`
 *
 */
export const addIsMasterFieldKey = ({ fields, ...rest }) => {
  const fx = (fields) =>
    fields?.length
      ? fields.map((field) => ({
          ...field,
          isMasterField: true,
          children: fx(field.children || [])
        }))
      : [];

  return { ...rest, fields: fx(fields) };
};
