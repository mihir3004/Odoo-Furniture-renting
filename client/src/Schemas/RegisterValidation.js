import * as Yup from "yup";

export const RegisterValidationSchemas = Yup.object({
  username: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  stripe_id: Yup.string(),
  contact: Yup.string().required("Required"),
});
