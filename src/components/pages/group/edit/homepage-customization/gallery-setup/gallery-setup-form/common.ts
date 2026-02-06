import * as Yup from "yup";

// shares common validation schema for add and edit gallery slider
export const galleryFieldValidationSchema = Yup.object().shape({
  title: Yup.string(),
  customDescripition: Yup.string(),
  fileName: Yup.string().nullable(),
  moreLinks: Yup.string().when("readMoreUIType", {
    is: (value) => value && value !== "none",
    then: (schema) =>
      schema.required("Show page link is required when readMore UI type is not none"),
    otherwise: (schema) => schema.notRequired().nullable()
  }),
  options: Yup.array().nullable(),
  truncated: Yup.boolean()
});
