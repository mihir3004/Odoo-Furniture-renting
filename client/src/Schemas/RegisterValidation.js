import * as Yup from "yup";

export const RegisterValidationSchemas = Yup.object().shape({
    Email: Yup.string().required("Email is required"),
    Password: Yup.string().required("Password is required"),
});
