import * as Yup from "yup";

export const SellItemValidation = Yup.object({
  name: Yup.string().required("Furniture name is required"),
  description: Yup.string().required("Description is required"),
  rentalPrice: Yup.number().required("Rental price is required"),
  category: Yup.string().required("Category is required"),
  rentalPeriod: Yup.string().required("Rental period is required"),
});
