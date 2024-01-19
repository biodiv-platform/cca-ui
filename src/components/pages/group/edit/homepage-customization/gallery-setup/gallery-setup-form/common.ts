import * as Yup from "yup";

// shares common validation schema for add and edit gallery slider
export const galleryFieldValidationSchema = Yup.object().shape({
  title: Yup.string(),
  customDescripition: Yup.string(),
  fileName: Yup.string().required(),
  moreLinks: Yup.string(),
  options: Yup.array().nullable(),
  truncated: Yup.boolean()
});
